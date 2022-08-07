import React, { useEffect } from "react";
import styles from "./Styles/body.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
type InputsTypes = {
  lastName: string;
  surname: string;
  telePhone: number;
  image: string;
  birthDate: string;
  male: boolean;
  female: boolean;
  language: string;
};

// const RegisterSchema = yup

function App() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InputsTypes>();

  const submitHandler: SubmitHandler<InputsTypes> = (data) => {
    console.log(data);
  };

  const gender = watch();

  useEffect(() => {
    if (gender.male) {
      setValue("female", false);
    }
  }, [gender.male, setValue]);

  useEffect(() => {
    if (gender.female) {
      setValue("male", false);
    }
  }, [gender.female, setValue]);

  return (
    <div className={styles.appContainer}>
      <form
        className={styles.innerContainer}
        onSubmit={handleSubmit(submitHandler)}
      >
        <h2>Register</h2>
        <div className={styles.inputContainer}>
          <label>Lastname</label>
          <input
            placeholder="Jon"
            autoComplete="off"
            className={styles.nameInput}
            {...register("lastName", { required: true, maxLength: 20 })}
          />
          {errors.lastName && <p>Field is required</p>}

          <label>Surname</label>
          <input
            placeholder="Doe"
            className={styles.nameInput}
            autoComplete="off"
            {...register("surname", { required: true, maxLength: 20 })}
          />
          {errors.surname && <p>Field is required</p>}

          <label>Phone</label>
          <input
            placeholder="012345678"
            autoComplete="off"
            {...register("telePhone", { required: true, maxLength: 11 })}
            className={styles.nameInput}
            type="tel"
          />
          {errors.telePhone && <p>Field is required</p>}

          <label>Image</label>
          <input
            className={styles.nameInput}
            type="file"
            {...register("image", { required: true })}
          />
          {errors.image && <p>Field is required</p>}
          <label>D.O.B</label>
          <input
            className={styles.nameInput}
            type="date"
            {...register("birthDate", { required: true })}
          />
          {errors.birthDate && <p>Field is required</p>}

          <label>Gender</label>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <label>Male</label>

            <input
              className={styles.checkGender}
              type="checkbox"
              value="male"
              {...register("male", {
                required: !gender.female && !gender.male,
              })}
            />
            {/* {errors.male && <p>Field is required</p>} */}
            <label>Female</label>
            <input
              className={styles.checkGender}
              type="checkbox"
              value="female"
              {...register("female", {
                required: !gender.male && !gender.female,
              })}
            />
            {errors.female && errors.male && <p>Field is required</p>}
          </div>

          <label>Language</label>
          <select id="lang" {...register("language", { required: true })}>
            <option selected value="English">
              English
            </option>
            <option value="Deutch">Deutch</option>
            <option value="spanish">spanish</option>
            <option value="Urdu">Urdu</option>
            <option value="Hindo">Hindi</option>
            <option value="Greek">Greek</option>
            <option value="french">French</option>
            <option value="Zulu">Zulu</option>
          </select>
        </div>

        {errors.language && <p>Field is required</p>}

        <div className={styles.buttonContainer}>
          <button>Sumbit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
