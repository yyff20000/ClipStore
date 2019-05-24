``` mysql =
CREATE TABLE articles (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR (200),
		file_path VARCHAR(500),
    body TEXT,
    FULLTEXT (title, body) WITH PARSER ngram
) ENGINE = INNODB;

CREATE FULLTEXT INDEX ft_index ON articles (title,body) WITH PARSER ngram;
```

TODO:
1. upload by file
2. upload by url
3. search result highlight
4. chrome plugin (set local server address)