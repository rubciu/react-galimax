import { CategoryAdd_categoryAdd } from "../../queries/category/__generated__/CategoryAdd";

import React, { useState } from "react";
import { Link } from "@reach/router";

import FormInput from "../form-input/form-input";

interface SubcategoryFormProps {
  category: CategoryAdd_categoryAdd | undefined;
  arrSubcategories: any; // TODO: Use generated type
}

interface SubcategoryFormState {
  subcategory: {
    name: string;
    description: string;
  };
}

const SubcategoryForm: React.FC<SubcategoryFormProps> = ({
  category,
  arrSubcategories,
}) => {
  const [formState, setFormState] = useState<SubcategoryFormState>({
    subcategory: {
      name: "",
      description: "",
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setFormState({
      ...formState,
      subcategory: {
        ...formState.subcategory,
        [name]: value,
      },
    });
  };

  const handleSubcategoryAdd = (event: any) => {
    event.preventDefault();

    arrSubcategories.push({
      name: formState.subcategory.name,
      description: formState.subcategory.description,
    });
  };

  return (
    <div>
      <h3>Subcategorias</h3>
      <ul>
        {category?.subcategories?.map((subcategory: any, index) => (
          <li key={index}>
            <Link to={`/categorias/${subcategory?.id}`}>{subcategory?.name}</Link>
          </li>
        ))}
      </ul>
      <FormInput
        field="name"
        label="Nombre"
        defaultValue={formState.subcategory.name}
        handleChange={handleChange}
      />
      <FormInput
        field="description"
        label="Descripcion"
        defaultValue={formState.subcategory.description}
        handleChange={handleChange}
      />
      <button onClick={(e) => handleSubcategoryAdd(e)}>
        Anadir subcategoria
      </button>
    </div>
  );
};

export default SubcategoryForm;
