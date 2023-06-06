import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { creates } from '@/api/orders';
import { Button } from '@material-ui/core';
import { Dialog, DialogDefaultLayout } from '@/components/Dialog';
import { AuthedUser } from '@/constants';
import { getLocalStorage } from '@/helpers/common';
import { setLoading } from '@/store/slices/loadging';
import { useDispatch } from 'react-redux';

interface PageProps {
}

const OrdersCreate: React.FC<PageProps> = (data) => {
  const [file, setFile] = useState(null);
  const [dialogOpen, setDialogOpen] = useState({
    isOpen: false,
    title: '',
    message: '',
  });
  const dispatch = useDispatch()

  const handleChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const upload = async (e: any) => {
    const {
      businessPartner,
    }: AuthedUser = getLocalStorage('auth');

    e.preventDefault();

    if (!file) { return; }

    const sendFormData = async () => {
      const data = new FormData();
      data.append('file', file);
      dispatch(setLoading({ isOpen: true }));

      try {
        await creates(
          data,
          { business_partner: businessPartner },
          'orders/create/edi/csv',
        );
        dispatch(setLoading({ isOpen: false }));
        setDialogOpen({
          ...dialogOpen,
          isOpen: true,
          title: 'Success',
          message: 'オーダーの登録が完了しました。',
        });
      } catch (e) {
        dispatch(setLoading({ isOpen: false }));
        setDialogOpen({
          ...dialogOpen,
          isOpen: true,
          title: 'Error',
          message: 'オーダーの登録に失敗しました。',
        });
      }
    };

    await sendFormData();
  }

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 注文（中小企業EDI CSV）'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'オーダーを作成します'}
        />
        <div>
          <form onSubmit={upload}>
            <input
              type="file"
              onChange={handleChange}
              id="file"
              accept=".csv"
              className=" border:blog hover:bg-blog/10 text-blog font-bold py-2 px-4 rounded"
            />
            <Button
              color={'primary'}
              type="submit"
              variant="contained"
            >オーダー作成</Button>
          </form>
          <Dialog
            isOpen={dialogOpen.isOpen}
          >
            <DialogDefaultLayout
              title={dialogOpen.title}
              message={dialogOpen.message}
              onClose={() => setDialogOpen({
                ...dialogOpen,
                isOpen: false,
              })}
            ></DialogDefaultLayout>
          </Dialog>
        </div>
      </Main>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
    }
  }
}

export default OrdersCreate;
