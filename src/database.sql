CREATE TABLE brand (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);


CREATE TABLE product (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  images JSON NOT NULL,
  rating DECIMAL(4,2) NOT NULL,
  price INT NOT NULL,

  brand_id INT NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brand(id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);

CREATE TABLE custom (
  id SERIAL PRIMARY KEY,
  datetime TIMESTAMP NOT NULL DEFAULT NOW(),
  totalPrice INT NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,

  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "user"(id)
);

CREATE TABLE custom_product (
  custom_id INT NOT NULL,
  product_id INT NOT NULL,
  FOREIGN KEY (custom_id) REFERENCES custom(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);