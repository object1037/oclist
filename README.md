# oclist

Manage all online class URLs in one place.

## PlanetScale schema

```sql
CREATE TABLE `account` (
  `account_id` varchar(255) NOT NULL,
  `account_email` varchar(255) NOT NULL,
  `range_0` varchar(255) NOT NULL,
  `range_1` varchar(255) NOT NULL,
  `range_2` varchar(255) NOT NULL,
  `range_3` varchar(255) NOT NULL,
  `range_4` varchar(255) NOT NULL,
  `range_5` varchar(255) NOT NULL,
  `autoclose` tinyint(1) NOT NULL,
  PRIMARY KEY (`account_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `class` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class_time` int NOT NULL,
  `class_title` varchar(255) NOT NULL,
  `class_url` varchar(255) NOT NULL,
  `account_email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id_idx` (`account_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## .env

```
PLANETSCALE_TOKEN
PLANETSCALE_ORG
PLANETSCALE_DB
PLANETSCALE_DB_USERNAME
PLANETSCALE_DB_PASSWORD
PLANETSCALE_DB_HOST
PLANETSCALE_SSL_CERT_PATH
PLANETSCALE_TOKEN_NAME
NEXTAUTH_SECRET
NEXTAUTH_URL
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
```