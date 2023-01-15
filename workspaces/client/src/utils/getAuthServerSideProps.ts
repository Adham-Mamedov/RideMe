import { GetServerSideProps } from 'next';
import axios, { AxiosError } from 'axios';

import { ECookieNames, ERoute } from '@shared/enums';
import { SuccessEntity } from '@server/common/entities/common.entities';

interface IPageProps {
  props: {};
}
interface IRedirectToLoginProps {
  redirect: {
    destination: string;
    permanent: boolean;
  };
}

export const getAuthServerSideProps: GetServerSideProps = async (
  appContext
): Promise<IPageProps | IRedirectToLoginProps> => {
  const path = appContext.resolvedUrl.split('?')[0];
  const pageProps = {
    props: {},
  };
  const redirectToLoginProps = {
    redirect: {
      destination: `/login?back=${encodeURI(path)}`,
      permanent: false,
    },
  };

  const cookies = appContext.req.cookies;
  const refreshCookieName = ECookieNames.RefreshTokenCookieName;
  const accessCookieName = ECookieNames.AccessTokenCookieName;
  const host = process.env.APP_HOST || 'http://localhost:3000';

  if (!cookies[refreshCookieName]) return redirectToLoginProps;

  const axiosInstance = axios.create({
    baseURL: host,
    headers: {
      Cookie: `${refreshCookieName}=${
        cookies?.[refreshCookieName] || ''
      }; ${accessCookieName}=${cookies?.[accessCookieName] || ''}`,
    },
  });
  try {
    await axiosInstance.get<SuccessEntity>(`${ERoute.Api}${ERoute.Auth}/test`);
    return pageProps;
  } catch (error: unknown) {
    const err = error as AxiosError;
    if (err?.response?.status === 401) {
      try {
        const res = await axiosInstance.get(
          `${ERoute.Api}${ERoute.Auth}/refresh`
        );
        const cookiesToSet = res.headers['set-cookie'];
        cookiesToSet && appContext.res.setHeader('Set-Cookie', cookiesToSet);
        return pageProps;
      } catch {
        return redirectToLoginProps;
      }
    }
    return pageProps;
  }
};
