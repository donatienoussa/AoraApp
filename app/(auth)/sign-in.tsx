import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorScheme } from '@/hooks/useColorScheme'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useUser } from '@/contexts/UserContext'


const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Adresse e-mail invalide.")
    .required("L'email est obligatoire"),
  password: Yup.string()
    .min(8, "Au moins 8 caractères.")
    .required("Mot de passe obligatoire"),
});


const SignIn = () => {

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const logoSource = isDarkMode ? images.logo : images.logoDark;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useUser();


  const handleSubmit = async (values: { email: string, password: string }) => {

    setIsSubmitting(true)

    try {
      await user.login(values.email, values.password)
      setIsSubmitting(false)

    } catch (error) {
      throw new Error

    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='h-[95vh]'>
      <ScrollView>
        <View className='w-full h-full justify-center px-4 my-4'>
          <Image
            source={logoSource}
            className='w-[130] h-[84]'
            resizeMode='contain'
          />

          <Text
            className="text-2xl mt-10 font-psemibold dark:text-white"
          >
            Connectez-vous sur Aora
          </Text>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={SigninSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View>

                <FormField
                  title="Email"
                  value={values.email}
                  handleChangeText={handleChange('email')}
                  otherStyles="mt-7"
                  keyboardType="email-address"
                />
                {errors.email && touched.email && (
                  <Text className="text-red-600 dark:text-red-400">{errors.email}</Text>
                )}

                <FormField
                  title="Mot de passe"
                  value={values.password}
                  handleChangeText={handleChange('password')}
                  otherStyles="mt-7"
                />
                {errors.password && touched.password && (
                  <Text className="text-red-600 dark:text-red-400">{errors.password}</Text>
                )}

                <CustomButton
                  title="Se connecter"
                  handlePress={handleSubmit}
                  containerStyles="w-full mt-7"
                  textStyles="text-xl"
                  isLoading={isSubmitting}
                />
              </View>
            )}
          </Formik>


          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg font-pregular dark:text-gray-100'>N'avez-vous pas encore un compte ?
              {' '}<Link href="/sign-up" className='text-lg text-secondary-100'>créer un compte</Link>
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}


export default SignIn