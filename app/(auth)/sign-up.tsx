import { ScrollView, Image, View, Text } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useUser } from '@/contexts/UserContext';


const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .trim()
        .min(3, "Au moins trois caractères.")
        .required("Nom d'utilisateur obligatoire"),
    email: Yup.string()
        .trim()
        .email("Adresse e-mail invalide.")
        .required("L'email est obligatoire"),
    password: Yup.string()
        .min(8, "Au moins 8 caractères.")
        .required("Mot de passe obligatoire"),
});


export default function SignUp() {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const logoSource = isDarkMode ? images.logo : images.logoDark;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const user = useUser();

    const submit = async (values: { username: string, email: string, password: string }) => {

        setIsSubmitting(true)

        try {
            await user.register(values.email, values.password, values.username)
            setIsSubmitting(false)

        } catch (error) {
            throw new Error

        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <SafeAreaView className="h-full bg-white dark:bg-black">
            <ScrollView>
                <View className="w-full h-full justify-center px-4 my-6">
                    <Image
                        source={logoSource}
                        className="w-[115px] h-[35px]"
                        resizeMode="contain"
                    />

                    <Text className="text-2xl mt-10 font-psemibold text-black dark:text-white">
                        Créer votre compte sur Aora
                    </Text>

                    <Formik
                        initialValues={{ username: '', email: '', password: '' }}
                        validationSchema={SignupSchema}
                        onSubmit={submit}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched }) => (
                            <View>
                                <FormField
                                    title="Nom d'utilisateur"
                                    value={values.username}
                                    handleChangeText={handleChange('username')}
                                    otherStyles="mt-7"
                                />
                                {errors.username && touched.username && (
                                    <Text className="text-red-600 dark:text-red-400">{errors.username}</Text>
                                )}

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
                                    title="S'inscrire"
                                    handlePress={handleSubmit}
                                    containerStyles="w-full mt-7"
                                    textStyles="text-xl"
                                    isLoading={isSubmitting}
                                />
                            </View>
                        )}
                    </Formik>

                    <View className="pt-5 flex-row gap-1">
                        <Text className="text-lg font-pregular dark:text-gray-100 ">
                            Avez-vous déjà un compte ?
                            {' '}
                            <Link href="/sign-in" className="text-lg text-secondary-100">
                                connectez-vous.
                            </Link>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}