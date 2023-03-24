import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { Card, Heading } from '@chakra-ui/react';

import AccountDetailsForm from '@client/components/registerPage/AccountDetailsForm';
import CardDetailsForm from '@client/components/registerPage/CardDetailsForm';
import ClientEmpty from '@client/components/shared/layouts/ClientEmpty';

import { useAxios } from '@client/hooks/useAxios';

import { SuccessEntity } from '@server/common/entities/common.entities';
import { IRegisterUser } from '@shared/types/auth.types';

const RegisterPage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [processStep, setProcessStep] = useState(1);

  const [formData, setFormData] = useState<IRegisterUser>({
    password: '',
    email: '',
    name: '',
    card: {
      number: '',
      expDate: '',
    },
  });

  const router = useRouter();
  const axios = useAxios();

  const updateFormData = useCallback(
    (event: any, key: string, subKey?: string) => {
      setFormData((prevState) => ({
        ...prevState,
        [key]: !subKey
          ? event.target.value
          : {
              ...(prevState[
                key as keyof IRegisterUser
              ] as IRegisterUser['card']),
              [subKey]: event.target.value,
            },
      }));
    },
    []
  );

  const handleStageChange = useCallback((e: any, value: number) => {
    e.preventDefault();
    setProcessStep(value);
  }, []);

  const submitHandler = useCallback(
    async (e: any) => {
      try {
        setLoading(true);
        e.preventDefault();
        await axios.post<SuccessEntity>('/auth/register', formData);
        await router.push((router.query.back || '/') as string);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [axios, formData, router]
  );

  const formContent = useMemo(() => {
    if (processStep === 1)
      return (
        <AccountDetailsForm
          formData={formData}
          updateFormData={updateFormData}
          submitHandler={handleStageChange}
        />
      );

    return (
      <CardDetailsForm
        formData={formData}
        updateFormData={updateFormData}
        loading={loading}
        submitHandler={submitHandler}
        backHandler={handleStageChange}
      />
    );
  }, [
    processStep,
    formData,
    updateFormData,
    handleStageChange,
    loading,
    submitHandler,
  ]);

  return (
    <ClientEmpty
      props={{
        justifyContent: 'center',
        alignItems: 'center',
        minH: '100vh',
        gap: ['1rem', null, '1.5rem'],
        p: '1rem',
      }}
    >
      <Heading fontWeight={400} fontSize="1.5rem">
        Register
      </Heading>

      <Card shadow={0} p={['1rem', '1.5rem']} w={['100%', '360px']}>
        {formContent}
      </Card>
    </ClientEmpty>
  );
};

export default RegisterPage;
