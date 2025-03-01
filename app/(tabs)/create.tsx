import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import UploadVideo from '@/components/UploadVideo';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoPlayer from '@/components/VideoPlayer';
import { VideoSource } from 'expo-video';
import * as Yup from 'yup';
import { Formik } from 'formik';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';


const CreateVideoSchema = Yup.object().shape({
    title: Yup.string().trim().min(3,"Au moins trois caractères.").required("Le titre est obligatoire"),
    videoUrl: Yup.string().required("L'url de la video est obligatoire"),
    coverImageUrl: Yup.string().required("L'url de l'image de couverture est obligatoire"),
    prompt: Yup.string().required("Le prompt est obligatoire"),
});


export default function Create() {
    const [video, setVideo] = useState<string | undefined>(undefined);
    const [videoSource, setVideoSource] = useState<VideoSource>({
        uri: undefined
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    

    useEffect(() => {
        if (video) {
            setVideoSource({ uri: video });
        }
    }, [video]);


    const handleSubmit = (values: { title: string, videoUrl: string, coverImageUrl: string, prompt: string }) => {
        console.log(values);
    }
    
    
    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <View className="flex-1 p-5">
                <Text className="text-2xl font-bold mb-4 dark:text-white">
                    Enregistrer une vidéo
                </Text>

                <Formik
                    initialValues={{
                        title: '',
                        videoUrl: '',
                        coverImageUrl: '',
                        prompt: ''
                    }}
                            validationSchema={CreateVideoSchema}
                            onSubmit={handleSubmit}
                          >
                            {({ handleChange, handleSubmit, values, errors, touched }) => (
                              <View>
                
                                <FormField
                                  title="Titre de la vidéo"
                                  value={values.title}
                                  handleChangeText={handleChange('title')}
                                  otherStyles="mt-7"
                                />
                                {errors.title && touched.title && (
                                    <Text className="text-red-600 dark:text-red-400">
                                        {errors.title}
                                    </Text>
                                )}
                            
                                <UploadVideo
                                    video={video}
                                    setVideo={setVideo}
                                    videoSource={videoSource}
                                />

                            <FormField
                                title="Prompt"
                                value={values.prompt}
                                handleChangeText={handleChange('prompt')}
                                otherStyles="mt-7"
                            />
                            {errors.prompt && touched.prompt && (
                                <Text className="text-red-600 dark:text-red-400">
                                    {errors.prompt}
                                </Text>
                            )}
         
                                <CustomButton
                                  title="Envoyer & Publier"
                                  handlePress={handleSubmit}
                                  containerStyles="w-full mt-7"
                                  textStyles="text-xl"
                                  isLoading={isSubmitting}
                                />
                              </View>
                            )}
                          </Formik>

            </View>
        </SafeAreaView>
    );
}
