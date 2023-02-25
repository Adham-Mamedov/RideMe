import Head from 'next/head';
import type { FC } from 'react';

interface HTMLHeadProps {
  title?: string;
  description?: string;
}

const HTMLHead: FC<HTMLHeadProps> = (props) => {
  const { title = 'RideME', description = 'Service for shared bicycles' } =
    props;

  return (
    <Head>
      <title>{title}</title>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://lh3.googleusercontent.com/wF4YRdnZIlh-QsqoSh4EszJKEyhQM8Mo46tE-SbZpKimk8hf_Cd2GGVqDts9mFp2foPvoeC1_yUWwtGIrduMxq9rMTXCSbTJiJcI16DIy4WuOsKQpx1TQD3hJgCr0InqltSJred_jrvuQrovBCb8QUGmuEu9kq82xWHpXiQgiBVo91NyTiPVOvvSNLToduOHPUZO7xqWfYVJJJTOiEWZPRFuaX4mQq4xxs3VuBfnaVJgCQoJdUCSSVZk8phoMMJh4a8jgbMkrReVY9NoLIHeSlGbrlakP3mnW_Jm-0GZnBw_c763RtpF2sScxbX9bX1ckDrieEt0iChqsslGhoImXijSO1VoOSF3Sk_kR0jvxpNPWtyymdv_dYtUSalzhLLWL7x0-TsbQ3maUQEwoYXxNR8d_S4fpZhw2EKR4RMt8TxBSUukgHbf_wAM3HxscBNfmtE8W4Wa6ivajUKn0JSzDxynCPVgSh5HSMFHPvKHFFlF05gD8kD6QwoV2Uf9sKLfwlqYm4MQ76YZnHG2Axkg3hN--az5f0SgVlLMsAGtehUUetSoawkrvOY6VHMbuDxHD8b71NeJMiYSxb07xqXptRxT7DrseGEH_5ZEbbCxEDu77VwaW9bsq4LBEkKs-uKqdG2UBknyEa63vsKtbuKipGNmQoR-IdgItEtdc2kSEEASfrqnmyDVaoLArU1TzSfP0FvZ2BtueYr2MKqu94SwsAFAnD6hoTKClwzlWEp-XsKnicaOtE60R4G28WnnaBH_Miefw5hDcidmz8UXfFXnDCWoiu7orCtfyC8Srbw2uqvBHUVbWSxC2PkCD6bzBKZTDxusayVqVdlvVfdi19VJJTelkRHg64QSYlD3X1zw4ZDXfnEWkpTAhz8bOBuOkK2zc_BKZflaVCGTGUvTd6cgIr4OWtaMGanw1S-5vFymcWRgymXqcWooUsINKUh0k3FABWaB1-yExe1RJstUNhwVkt_3ksUJ7lYkibHpBdAdWcCHm2l2Xio6j2iS=s250-k-rw-no"
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
    </Head>
  );
};

export default HTMLHead;
