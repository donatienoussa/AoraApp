import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { ComponentProps } from 'react';
import { Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          // Empêche le comportement par défaut d'ouvrir le lien dans le navigateur natif
          event.preventDefault();
          // Ouvre le lien dans un navigateur intégré dans l'application
          await openBrowserAsync(href);
        }
      }}
    />
  );
}
