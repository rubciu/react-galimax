import * as GetCategoriesTypes from "../../queries/category/__generated__/GetCategories";

import React from "react";
import { Link } from "@reach/router";

import styles from "./menu.module.scss";

interface MenuProps {
  categories?: GetCategoriesTypes.GetCategories;
}

const Menu: React.FC<MenuProps> = ({ categories }) => {
  return (
    <div className={styles.mainMenu}>
      <p>
        <Link to="/">Productos</Link>
        <br />
      </p>
      <p>
        <Link to="/productos/anadir">Añadir producto</Link>
        <br />
      </p>
      <p>
        <Link to="/categorias">Categorias</Link>
      </p>
    </div>
  );
};

export default Menu;
