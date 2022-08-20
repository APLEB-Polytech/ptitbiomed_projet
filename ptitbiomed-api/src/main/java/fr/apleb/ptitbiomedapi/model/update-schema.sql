CREATE TABLE roles
(
    id   INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(20),
    CONSTRAINT pk_roles PRIMARY KEY (id)
);

CREATE TABLE user_roles
(
    role_id INT    NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT pk_user_roles PRIMARY KEY (role_id, user_id)
);

CREATE TABLE users
(
    id       BIGINT AUTO_INCREMENT NOT NULL,
    username VARCHAR(255),
    email    VARCHAR(255),
    password VARCHAR(255),
    CONSTRAINT pk_users PRIMARY KEY (id)
);

ALTER TABLE users
    ADD CONSTRAINT uc_74165e195b2f7b25de690d14a UNIQUE (email);

ALTER TABLE users
    ADD CONSTRAINT uc_77584fbe74cc86922be2a3560 UNIQUE (username);

ALTER TABLE user_roles
    ADD CONSTRAINT fk_userol_on_role FOREIGN KEY (role_id) REFERENCES roles (id);

ALTER TABLE user_roles
    ADD CONSTRAINT fk_userol_on_user FOREIGN KEY (user_id) REFERENCES users (id);

CREATE TABLE menu
(
    id       BIGINT AUTO_INCREMENT NOT NULL,
    label    VARCHAR(255) NOT NULL,
    link     VARCHAR(255),
    CONSTRAINT pk_menu PRIMARY KEY (id)
);

CREATE TABLE submenua
(
    id       INT AUTO_INCREMENT NOT NULL,
    label    VARCHAR(255) NOT NULL,
    id_parent INT NOT NULL,
    link    VARCHAR(255),
    CONSTRAINT pk_submenua PRIMARY KEY (id)
);

CREATE TABLE submenub
(
    id       INT AUTO_INCREMENT NOT NULL,
    label    VARCHAR(255) NOT NULL,
    id_parent INT NOT NULL,
    link    VARCHAR(255) NOT NULL,
    CONSTRAINT pk_submenub PRIMARY KEY (id)
);

ALTER TABLE submenua
    ADD CONSTRAINT fk_submenu_on_menu FOREIGN KEY (id_parent) REFERENCES menu(id);

ALTER TABLE submenub
    ADD CONSTRAINT fk_submenub_on_submenua FOREIGN KEY (id_parent) REFERENCES submenua(id);