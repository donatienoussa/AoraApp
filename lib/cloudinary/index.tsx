import { toast } from '@/lib/toast';

const CLOUDINARY_UPLOAD_PRESET = 'AoraPresset';
const CLOUDINARY_CLOUD_NAME = 'aoraAppAssets';
const CLOUDINARY_CLOUD_API_KEY = "893389787114733"
const CLOUDINARY_API_SECRET = "5g_tfuXi23Xsq_ErLMGyva899lc"
const CLOUDINARY_PUBLIC_ID = "14f4c16dc50a4ddb8c550091827b92"

const url =
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/video/upload/${CLOUDINARY_PUBLIC_ID}`;


// Création de l'en-tête d'autorisation en base64
const authHeader = 'Basic ' + btoa(`${CLOUDINARY_CLOUD_API_KEY}:${CLOUDINARY_API_SECRET}`);

fetch(url, {
    method: 'GET',
    headers: {
        Authorization: authHeader,
    },
})
    .then(response => response.json())
    .then(data => {
        console.log('Détails de la vidéo :', data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des détails de la vidéo :', error);
    });




// Fonction pour uploader une vidéo sur Cloudinary
export const uploadVideo = async (uri: string, setUploading: (value: boolean) => void, setVideo: (url: string) => void) => {
    setUploading(true);
    try {
        const formData = new FormData();
        formData.append('file', {
            uri,
            type: 'video/mp4',
            name: `${uri}.mp4`,
        } as any);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const data = await response.json();

        if (data.secure_url) {
            toast('Vidéo uploadée avec succès !');
            setVideo(data.secure_url);
        } else {
            toast('Échec de l\'upload.');
            console.error('Erreur Cloudinary :', data);
        }
    } catch (error) {
        toast('Une erreur est survenue lors de l\'upload.');
        console.error('Erreur lors de l\'upload :', error);
    } finally {
        setUploading(false);
    }
};

// Fonction pour supprimer une vidéo de Cloudinary
export const deleteVideo = async (publicId: string) => {
    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/video/upload`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ public_id: publicId }),
        });

        const data = await response.json();

        if (data.result === 'ok') {
            toast('Vidéo supprimée avec succès !');
        } else {
            toast('Échec de la suppression.');
            console.error('Erreur Cloudinary :', data);
        }
    } catch (error) {
        toast('Une erreur est survenue lors de la suppression.');
        console.error('Erreur lors de la suppression :', error);
    }
};

// Fonction pour lister les vidéos sur Cloudinary
export const listVideos = async () => {
    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/video/upload`, {
            method: 'GET',
        });

        const data = await response.json();
        return data.resources || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des vidéos :', error);
        return [];
    }
};

// Fonction pour mettre à jour les métadonnées d'une vidéo sur Cloudinary
export const updateVideoMetadata = async (publicId: string, metadata: Record<string, any>) => {
    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/video/upload`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ public_id: publicId, metadata }),
        });

        const data = await response.json();

        if (data.result === 'ok') {
            toast('Métadonnées mises à jour avec succès !');
        } else {
            toast('Échec de la mise à jour des métadonnées.');
            console.error('Erreur Cloudinary :', data);
        }
    } catch (error) {
        toast('Une erreur est survenue lors de la mise à jour des métadonnées.');
        console.error('Erreur lors de la mise à jour des métadonnées :', error);
    }
};

