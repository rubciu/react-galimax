import {
  CategoryAdd_categoryAdd,
  CategoryAddVariables,
  CategoryAdd_categoryAdd_subcategories,
  CategoryAdd,
} from "../../queries/category/__generated__/CategoryAdd";
import {
  SubcategoryAdd_subcategoryAdd,
  SubcategoryAddVariables,
} from "../../queries/subcategory/__generated__/SubcategoryAdd";

import React, { useState, useEffect } from "react";

import { useToasts } from "../../shared/toast/toast-provider";

import FormInput from "../form-input/form-input";
import SubcategoryForm from "../subcategory-form/subscategory-form";

import styles from "./category-form.module.scss";
import { useMutation } from "@apollo/client";
import { SUBCATEGORY_ADD } from "../../queries/subcategory";
import { CATEGORY_ADD } from "../../queries/category";

interface CategoryFormProps {
  category?: CategoryAdd_categoryAdd;
  subcategoryAdd?: (a: {
    variables: SubcategoryAddVariables | [SubcategoryAddVariables];
  }) => void;
}

interface CategoryFormState {
  category: {
    name: string;
    description: string;
    subcategories: string[];
  };
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category }) => {
  const arrSubcategories: CategoryAdd_categoryAdd_subcategories[] = [];
  const [formState, setFormState] = useState<CategoryFormState>({
    category: {
      name: "",
      description: "",
      subcategories: [],
    },
  });
  const subcategoriesFromState = formState.category.subcategories;
  const { addToast } = useToasts();

  const [categoryAdd] = useMutation<CategoryAdd, CategoryAddVariables>(
    CATEGORY_ADD,
    {
      onCompleted({ categoryAdd }) {
        addToast(`CATEGORY ADDED: ${categoryAdd?.name}`);
      },
    }
  );

  const [subcategoryAdd] = useMutation(SUBCATEGORY_ADD, {
    onCompleted({ subcategoryAdd }) {
      addToast("SUBCATEGORY ADDED");

      setFormState({
        ...formState,
        category: {
          ...formState.category,
          subcategories: subcategoryAdd.map(
            (subcategory: SubcategoryAdd_subcategoryAdd) => subcategory.id
          ),
        },
      });
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setFormState({
      ...formState,
      category: {
        ...formState.category,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    subcategoryAdd({
      variables: {
        subcategories: arrSubcategories,
      },
    });
    // TODO: After add category refetch them
  };

  useEffect(() => {
    if (category) {
      setFormState({
        category: {
          name: category.name,
          description: category.description,
          subcategories: [],
        },
      });
    }
  }, [category]);

  useEffect(() => {
    if (formState.category.subcategories.length > 0) {
      categoryAdd({
        variables: {
          category: formState.category,
        },
      });
    }
  }, [subcategoriesFromState]);

  return (
    <div className={styles.categoryForm}>
      <form onSubmit={handleSubmit}>
        <FormInput
          field="name"
          label="Categoria"
          defaultValue={formState.category.name}
          handleChange={handleChange}
        />
        <FormInput
          field="description"
          label="Descripción"
          defaultValue={formState.category.description}
          handleChange={handleChange}
        />
        <div className={styles.categoryForm__subcategories}>
          <SubcategoryForm
            category={category}
            arrSubcategories={arrSubcategories}
          />
        </div>
        {/* TODO: Borrar <br /> */}
        <br />
        <br />
        <button type="submit">Añadir categoria</button>
      </form>
    </div>
  );
};

export default CategoryForm;
