import { Button } from "@/components/ui/Button/Button";
import { FormControl } from "@/components/ui/FormControl/FormControl";
import InputText from "@/components/ui/InputText/InputText";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import styles from './LoginPage.module.scss'
import logo from '../../assets/images/logo.png';
import { InputCheckbox } from "@/components/ui/InputCheckbox/InputCheckbox";
import { LoginSchema } from "@/schemas/LoginSchema";

interface IFormInput {
  login: string
  password: string
  remember?: boolean
}

export const LoginPage = () => {
  const { control, handleSubmit } = useForm<IFormInput>({
    resolver: valibotResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      login: '',
      password: '',
      remember: false
    }
  })

 const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
  }

  return (
    <section>
      <article className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <header>
            <div className={styles.logo}>
              <img src={logo} alt="Логотип" />
            </div>
            <h1>Добро пожаловать!</h1>
            <span className={styles.subtitle}>Пожалуйста, авторизируйтесь</span>
          </header>
          <div className={styles.fields}>
            <Controller name="login" control={control} render={({field,fieldState}) => 
              <FormControl error={fieldState.error?.message}>
                <InputText type="text" label="Логин" icon="user" clearable {...field}></InputText>
              </FormControl>
            }></Controller>

            <Controller name="password" control={control} render={({field, fieldState}) => 
              <FormControl error={fieldState.error?.message}>
                <InputText type="password" label="Пароль" icon="lock" {...field}  ></InputText>
              </FormControl>
            }></Controller>
          </div>
          <div className={styles.remember}>
            <Controller name="remember" control={control} render={({field, fieldState}) => 
              <FormControl error={fieldState.error?.message}>
                <InputCheckbox label="Запомнить данные" {...field}></InputCheckbox>
              </FormControl>
            }></Controller>
          </div>

            <Button type="submit" level="primary" shape="square" size="large" styleProps={{marginLeft: 'auto', marginRight: 'auto', width: '100%', justifyContent: 'center'}} onClick={handleSubmit} text="Войти"></Button>

            <div className={styles.dividerRow}>
              <div className={styles.divider}></div>
              <p>или</p>
              <div className={styles.divider}></div>
            </div>

          <p className={styles.register}>Нет аккаунта? <a href="#">Создать</a></p>
        </form>
      </article>
    </section>
  );
};