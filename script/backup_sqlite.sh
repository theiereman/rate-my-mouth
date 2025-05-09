#!/bin/bash

# Vérification des paramètres
if [ $# -ne 2 ]; then
  echo "Usage: $0 <repertoire_bases_sqlite> <repertoire_backups>"
  exit 1
fi

DB_DIR="$1"
BACKUP_DIR="$2"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
TEMP_DIR="/tmp/sqlite_backups_$DATE"

# Trouver toutes les bases .sqlite3
DB_FILES=($(find "$DB_DIR" -maxdepth 1 -type f -name "*.sqlite3"))

# Vérification
if [ ${#DB_FILES[@]} -eq 0 ]; then
  echo "Aucune base .sqlite3 trouvée dans $DB_DIR"
  exit 1
fi

# Créer les dossiers nécessaires
mkdir -p "$BACKUP_DIR"
mkdir -p "$TEMP_DIR"

# Sauvegarde des bases dans le dossier temporaire
for DB_PATH in "${DB_FILES[@]}"; do
    DB_NAME=$(basename "$DB_PATH")
    TEMP_BAK="$TEMP_DIR/$DB_NAME"

    echo "Sauvegarde de $DB_NAME..."
    sqlite3 "$DB_PATH" ".backup '$TEMP_BAK'"
done

# Création de l'archive compressée
ARCHIVE_NAME="backup_$DATE.tar.gz"
tar -czf "$BACKUP_DIR/$ARCHIVE_NAME" -C "$TEMP_DIR" .

# Nettoyage
rm -r "$TEMP_DIR"

# Suppression des archives de plus de 5 jours
find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +5 -delete

echo "Sauvegarde terminée : $BACKUP_DIR/$ARCHIVE_NAME"
