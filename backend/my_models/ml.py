"""Import Packages"""
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')
warnings.filterwarnings('ignore', category=DeprecationWarning)

"""Import data as data frame"""
df = pd.read_csv('Diabetestype.csv')

print(df.head())
print(df.info())
print(df.describe())

"""Drop unnecessary column"""
if 'Class' in df.columns:
    df.drop("Class", axis=1, inplace=True)

"""Exploratory Data Analysis"""
plt.figure(figsize=(12, 8))
sns.countplot(x='Type', data=df)
plt.title("Count of Diabetes Types")
plt.savefig("plot1_count_type.png")

plt.figure(figsize=(50, 10))
sns.countplot(x='Type', hue='Age', data=df)
plt.title("Diabetes Type by Age")
plt.savefig("plot2_type_by_age.png")

plt.figure(figsize=(20, 8))
sns.boxplot(x='Age', y='BS Fast', data=df)
plt.title('Box Plot of Age with Blood Sugar Level')
plt.savefig("plot3_boxplot.png")

plt.figure(figsize=(20, 8))
sns.scatterplot(x='Age', y='BS Fast', data=df, hue='Type')
plt.title('Scatter Plot of Age with Blood Sugar Level')
plt.savefig("plot4_scatter.png")

plt.figure(figsize=(18, 15))
# Use only numeric columns for correlation
sns.heatmap(df.select_dtypes(include=[np.number]).corr(), annot=True, cmap='RdYlGn')
plt.title("Correlation Heatmap")
plt.savefig("plot5_heatmap.png")

"""Import ML Packages"""
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression, LogisticRegressionCV
from sklearn.model_selection import GridSearchCV, cross_val_score, train_test_split
from sklearn.metrics import classification_report
import pickle

"""Build the ML Model"""
X = df.drop('Type', axis=1)
y = df['Type']

# Handle categorical features if any
if X.select_dtypes(include=['object']).shape[1] > 0:
    X = pd.get_dummies(X)

def compute_score(clf, X, y, scoring='accuracy'):
    xval = cross_val_score(clf, X, y, cv=5, scoring=scoring)
    return np.mean(xval)

"""Test Different Base Models"""
models = [
    LogisticRegression(max_iter=1000),
    LogisticRegressionCV(cv=5, max_iter=1000),
    RandomForestClassifier(),
    GradientBoostingClassifier()
]

for model in models:
    print('Cross-validation of :', model.__class__.__name__)
    score = compute_score(clf=model, X=X, y=y, scoring='accuracy')
    print('CV score =', score)
    print('****')

"""Train-Test Split and Final Training"""
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=0)

final_model = RandomForestClassifier()
final_model.fit(X_train, y_train)

y_pred = final_model.predict(X_test)
print(classification_report(y_test, y_pred))

"""Save the Model"""
model_name = 'model.pkl'
pickle.dump(final_model, open(model_name, 'wb'))
print("[INFO]: Finished Saving Model.")
