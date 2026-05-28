# Documentation Projet OULAD

 **Base de données :** `oulad_db` · **Source :** Open University Learning Analytics Dataset · **Pipeline :** PySpark → MongoDB Atlas

---

## Vue d'ensemble

Le dataset **OULAD** *(Open University Learning Analytics Dataset)* est une base publique et anonymisée publiée par l'Open University au Royaume-Uni. Elle couvre plus de **32 000 étudiants**, leurs parcours académiques, et surtout leur façon d'interagir avec la plateforme d'apprentissage en ligne (VLE — Virtual Learning Environment).

L'objectif du projet est de construire un pipeline complet : ingestion et transformation des données brutes via PySpark, stockage dans MongoDB Atlas, puis entraînement d'un modèle de machine learning capable de prédire le résultat académique d'un étudiant à partir de son profil et de ses comportements en ligne.

---

## Collections MongoDB

Le pipeline PySpark alimente **5 collections** dans la base `oulad_db`. Chacune répond à un angle d'analyse différent.

### `notes_par_semaine`

Note moyenne obtenue chaque semaine, croisée avec le résultat final. Utile pour suivre comment les différents groupes d'étudiants progressent (ou décrochent) au fil du semestre.

| Champ | Type | Description |
|---|---|---|
| `week` | Integer | Numéro de semaine — calculé comme `date / 7` |
| `final_result` | String | Résultat final : `Pass`, `Distinction`, `Fail`, `Withdrawn` |
| `mean_score` | Float | Note moyenne sur 100 |

```json
{ "week": 5, "final_result": "Pass", "mean_score": 71.2 }
```

Les couleurs utilisées dans le dashboard : `Pass` → `#1D9E75`, `Distinction` → `#378ADD`, `Fail` → `#EF9F27`, `Withdrawn` → `#E24B4A`.

---

### `clicks_par_semaine`

Nombre moyen de clics sur le VLE par semaine, segmenté par résultat final. Cette collection est au cœur de l'analyse comportementale — on y voit clairement à quelle semaine les étudiants en difficulté commencent à décrocher.

| Champ | Type | Description |
|---|---|---|
| `week` | Integer | Numéro de semaine |
| `final_result` | String | Résultat final |
| `mean_clicks` | Float | Moyenne de clics par semaine |

```json
{ "week": 8, "final_result": "Distinction", "mean_clicks": 14.7 }
```

---

### `clicks_par_activite`

Total des clics agrégés par type de ressource VLE et par résultat final. Permet de voir quels outils sont réellement utilisés, et lesquels sont ignorés.

Types d'activité disponibles : `forumng`, `oucontent`, `homepage`, `subpage`, `quiz`, `resource`, `ouwiki`, `glossary`.

| Champ | Type | Description |
|---|---|---|
| `activity_type` | String | Type de ressource |
| `final_result` | String | Résultat final |
| `total_clicks` | Integer | Total des clics sur cette ressource |

```json
{ "activity_type": "forumng", "final_result": "Pass", "total_clicks": 245300 }
```

---

### `clicks_activite_semaine`

Évolution semaine par semaine des clics moyens, par type d'activité. Donne une vue temporelle du VLE, indépendamment du résultat final.

| Champ | Type | Description |
|---|---|---|
| `week` | Integer | Numéro de semaine |
| `activity_type` | String | Type de ressource |
| `mean_clicks` | Float | Clics moyens sur ce type |

---

### `etudiants`

Table de référence avec les caractéristiques démographiques et académiques de chaque étudiant.

| Champ | Type | Description |
|---|---|---|
| `id_student` | Integer | Identifiant unique |
| `code_module` | String | Module suivi (ex : `AAA`) |
| `code_presentation` | String | Session — `2013J` (oct. 2013), `2014B` (fév. 2014) |
| `gender` | String | `M` / `F` |
| `region` | String | Région géographique |
| `highest_education` | String | Niveau d'éducation avant inscription |
| `num_of_prev_attempts` | Integer | Nombre de tentatives précédentes |
| `studied_credits` | Integer | Crédits étudiés |
| `disability` | String | `Y` / `N` |
| `final_result` | String | Résultat final |

---

## Dataset étudiant

Le pipeline produit un dataset final de **32 593 étudiants × 35 colonnes**, combinant profil démographique, comportement VLE et résultats académiques.

### Colonnes principales

**Identifiants :** `id_student`, `code_module`, `code_presentation`

**Profil :** `gender`, `highest_education`, `disability`

**Résultats :** `final_result`, `note_moyenne`, `note_minimale`, `note_maximale`

**Évaluations :** `exam_tma` (corrigées par tuteur), `exam_cma` (QCM automatiques), `exam_exam` (examen final)

**Engagement :**
- `moyenne_clics_par_session` — intensité d'utilisation du VLE (0 → ~20 clics/semaine)
- `taux_participation` — ratio semaines actives / semaines totales du cours (0 → 1)

**Ressources VLE :** une colonne par type (`resource_oucontent`, `resource_forumng`, `resource_quiz`, etc.) avec la somme totale des clics de l'étudiant sur cette ressource.

---

## Pipeline PySpark

### Chargement des données

```python
import kagglehub
from pyspark.sql import functions as F

path = kagglehub.dataset_download("anlgrbz/student-demographics-online-education-dataoulad")

def load_spark(filename):
    return (
        spark.read
            .option("header", "true")
            .option("inferSchema", "true")
            .csv(f"file:{workspace_path}/{filename}")
    )

info        = load_spark("studentInfo.csv")
sa          = load_spark("studentAssessment.csv")
assess      = load_spark("assessments.csv")
vle         = load_spark("vle.csv")
student_vle = load_spark("studentVle.csv")
```

### Fusion et enrichissement du VLE

```python
vle_full = (
    student_vle
    .join(
        vle.select("id_site", "code_module", "code_presentation", "activity_type"),
        on=["id_site", "code_module", "code_presentation"],
        how="left"
    )
    .join(
        info.select("id_student", "code_module", "code_presentation", "final_result"),
        on=["id_student", "code_module", "code_presentation"],
        how="left"
    )
    .withColumn("week", (F.col("date") / 7).cast("int"))
)
```

### Calcul du taux de participation

```python
vle_with_week = student_vle.withColumn("week", (F.col("date") / 7).cast("int"))

total_weeks_course = (
    vle_with_week
    .groupBy("code_module", "code_presentation")
    .agg(F.countDistinct("week").alias("total_semaines_cours"))
)

vle_stats = (
    vle_with_week
    .groupBy("id_student", "code_module", "code_presentation")
    .agg(
        F.countDistinct("week").alias("semaines_actives"),
        F.mean("sum_click").alias("moyenne_clics_par_session")
    )
    .join(total_weeks_course, on=["code_module", "code_presentation"], how="left")
    .withColumn(
        "taux_participation",
        F.round(F.col("semaines_actives") / F.col("total_semaines_cours"), 4)
    )
    .drop("semaines_actives", "total_semaines_cours")
)
```

### Export

```python
dataset_pd = dataset.toPandas()
dataset_pd.to_csv("/Workspace/Shared/oulad_data/student_dataset.csv", index=False)
```

---

## Modèle de machine learning

### Préparation des données

Avant d'entraîner quoi que ce soit, trois colonnes ont été supprimées d'emblée : `id_student`, `code_module` et `code_presentation`. L'identifiant étudiant n'a évidemment aucun pouvoir prédictif, et les codes de module ont été écartés pour garder le modèle généraliste — l'objectif étant de pouvoir l'adapter à d'autres contextes que l'Open University.

Les colonnes catégorielles ont ensuite été encodées de deux façons :

- **One-Hot Encoding** pour `gender` et `disability`, qui n'ont que deux valeurs possibles — l'explosion dimensionnelle reste limitée.
- **Ordinal Encoding** pour `final_result` et `highest_education`, où il y a une vraie hiérarchie à respecter.

```python
# Ordinal : final_result
# Withdrawn=0 · Fail=1 · Pass=2 · Distinction=3

# Ordinal : highest_education
# No Formal quals=0 · Lower Than A Level=1 · A Level or Equivalent=2
# HE Qualification=3 · Post Graduate Qualification=4
```

### Architecture : un Random Forest par colonne

Le choix d'architecture est un peu particulier : plutôt qu'un seul modèle qui prédit `final_result`, on entraîne **un Random Forest par colonne**. Chaque modèle prédit sa cible à partir de toutes les autres colonnes. Ça permet de compléter n'importe quel profil partiel — si on connaît uniquement le genre et le niveau d'éducation, le modèle peut estimer le reste.

Les colonnes catégorielles sont prédites par un `RandomForestClassifier` (métrique : accuracy), les colonnes numériques par un `RandomForestRegressor` (métrique : R²).

```python
class StudentPredictor:
    def __init__(self, n_estimators=100, max_depth=12):
        ...

    def fit(self, df_train, df_test):
        for target in self.all_cols_:
            features = [c for c in self.all_cols_ if c != target]
            # RandomForestClassifier si target est catégorielle
            # RandomForestRegressor sinon
            ...
```

### Première version — problèmes rencontrés

La première version du modèle (50 arbres, max_depth=15) a mis en évidence plusieurs problèmes :

- Les colonnes `gender_F` / `gender_M` atteignaient des scores quasi-parfaits, ce qui est logique puisqu'elles sont complémentaires (si l'une vaut 1, l'autre vaut 0). Le modèle "trichait" en quelque sorte.
- La colonne `highest_education` avait un score catastrophiquement bas.
- Les courbes d'apprentissage montraient clairement du surapprentissage (overfitting).

Une tentative d'ajout d'une couche SGD *(Stochastic Gradient Descent)* pour corriger le tir a été abandonnée — elle détruisait littéralement les performances du Random Forest en production.

### Optimisation

Trois ajustements ont été nécessaires pour obtenir un modèle exploitable.

**1. Suppression des colonnes bruyantes ou redondantes**

Après analyse de la matrice de corrélation, `note_minimale` et `note_maximale` ont été retirées : elles ne portent pas d'information que `note_moyenne` n'a pas déjà. Quelques colonnes VLE très peu utilisées ont également été supprimées (`resource_repeatactivity`, `resource_sharedsubpage`, `resource_glossary`, `resource_folder`).

**2. Rééquilibrage avec SMOTE**

La distribution de `final_result` est déséquilibrée — les classes `Pass` et `Withdrawn` dominent largement. Sans correction, le modèle aurait naturellement biaisé ses prédictions vers ces deux catégories. SMOTE *(Synthetic Minority Oversampling Technique)* a été appliqué **uniquement sur le jeu d'entraînement** pour ne pas contaminer l'évaluation.

```python
from imblearn.over_sampling import SMOTE

smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train_raw, y_train_raw)
```

**3. Régularisation du Random Forest**

Les hyperparamètres ont été resserrés pour limiter le surapprentissage :

```python
rf_params = {
    'n_estimators': 100,
    'max_depth': 12,
    'min_samples_leaf': 20,   # évite les feuilles trop spécifiques
    'min_samples_split': 50,  # évite les divisions sur trop peu d'exemples
    'max_features': 'sqrt',   # diversifie les arbres
}
```

### Résultats finaux

Le modèle final atteint **~73% d'accuracy** sur `final_result`, avec un écart entraînement/validation inférieur à 5%. La courbe d'apprentissage montre une convergence propre après 22 000 exemples — le rééquilibrage SMOTE a eu un effet visible sur ce point précis.

```
Modèle     : Random Forest (optimisé)
Données    : nettoyées + rééquilibrées (SMOTE sur train uniquement)
Accuracy   : ~73% sur l'ensemble de test
Overfitting: résolu — gap < 5%
```

Le modèle est sauvegardé via `pickle` et chargeable en production :

```python
final_predictor.save("rf_final_model.pkl")
# Rechargement
predictor = StudentPredictor().load("rf_final_model.pkl")
```

---

## Relations entre collections

```
etudiants
└── final_result ──────────┬── notes_par_semaine.final_result
                           ├── clicks_par_semaine.final_result
                           └── clicks_par_activite.final_result

clicks_par_semaine
└── (week, final_result) ──── carte thermique d'engagement (pivot)

clicks_activite_semaine
└── activity_type ─────────── clicks_par_activite.activity_type
```