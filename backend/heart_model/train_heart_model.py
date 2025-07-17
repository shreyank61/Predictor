"""📦 Import Packages"""
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')

"""📄 Load Dataset"""
df = pd.read_csv("heart_data.csv")

print(df.head())
print(df.info())
print(df.describe())

"""🔍 Exploratory Data Analysis"""

# 1. Count of Heart Disease Cases
plt.figure(figsize=(8, 6))
sns.countplot(x='target', data=df, palette='Set2')
plt.title("Count of Heart Disease Cases (1 = Disease, 0 = Healthy)")
plt.savefig("heart_plot1_count_target.png")

# 2. Age distribution by disease
plt.figure(figsize=(10, 6))
sns.histplot(data=df, x='age', hue='target', bins=20, kde=True, palette='husl')
plt.title("Age Distribution by Heart Disease")
plt.savefig("heart_plot2_age_disease.png")

# 3. Correlation Heatmap
plt.figure(figsize=(16, 12))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
plt.title("Correlation Heatmap")
plt.savefig("heart_plot3_corr.png")

# 4. Boxplot of cholesterol by target
plt.figure(figsize=(10, 6))
sns.boxplot(x='target', y='chol', data=df, palette='cool')
plt.title("Cholesterol Levels vs Heart Disease")
plt.savefig("heart_plot4_chol.png")

"""🧠 ML Preparation"""
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression, LogisticRegressionCV
from sklearn.model_selection import GridSearchCV, cross_val_score, train_test_split
from sklearn.metrics import classification_report
import pickle

# Features and target
X = df.drop('target', axis=1)
y = df['target']

"""⚙️ Encode any categorical columns (if any)"""
if X.select_dtypes(include=['object']).shape[1] > 0:
    X = pd.get_dummies(X)

"""🔎 Cross-Validation Scores"""
def compute_score(clf, X, y, scoring='accuracy'):
    return np.mean(cross_val_score(clf, X, y, cv=5, scoring=scoring))

models = [
    LogisticRegression(max_iter=1000),
    LogisticRegressionCV(cv=5, max_iter=1000),
    RandomForestClassifier(),
    GradientBoostingClassifier()
]

for model in models:
    print(f'🔄 {model.__class__.__name__}')
    score = compute_score(clf=model, X=X, y=y)
    print(f'CV Accuracy: {score:.4f}\n{"-"*30}')

"""📊 Train-Test Split & Final Training"""
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)

final_model = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)
final_model.fit(X_train, y_train)

y_pred = final_model.predict(X_test)
print("📈 Final Model Performance:\n")
print(classification_report(y_test, y_pred))

"""💾 Save the Model"""
model_name = 'heart_advanced_model.pkl'
pickle.dump(final_model, open(model_name, 'wb'))
print(f"✅ Model saved as {model_name}")
