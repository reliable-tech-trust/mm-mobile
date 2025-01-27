/* eslint-disable react-native/no-inline-styles */
import {ICONS} from '@assets';
import {Block, FormContainer, GradientButton, Header, Image, ImagePicker, Loading, Text, TextInput} from '@components';
import {useColors, useMediaPicker, useStore, useTranslation} from '@hooks';
import {GenderType, UpdateUserPayload} from '@screens/Auth/types';
import {UPDATE_USER_INFO, UPLOAD_FILE} from '@store/actions';
import {getSize} from '@utils/responsive';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';

const EditProfile: React.FC = () => {
  const {dispatch, useSelector} = useStore();
  const {COLORS} = useColors();
  const {userInfo} = useSelector('auth');
  const {isLoading} = useSelector('uploadFile');
  const {media, openPicker, openCamera} = useMediaPicker({cropping: true});
  const [isOpenMediaPicker, setOpenMediaPicker] = useState<boolean>(false);
  const [gender, setGender] = useState<GenderType>(userInfo.gender);
  const [info, setInfo] = useState<UpdateUserPayload>({
    fullName: userInfo.fullName,
    avatar: userInfo.avatar,
    phoneNumber: userInfo.phoneNumber,
    areaCode: userInfo.areaCode,
    slogan: userInfo.slogan,
    gender: userInfo.gender,
  });
  const {t} = useTranslation();

  useEffect(() => {
    if (media) {
      const form = new FormData();
      form.append('file', {
        uri: (media as any).path,
        name: (media as any).path.split('/').pop(),
        type: (media as any).mime,
      });
      dispatch({
        type: UPLOAD_FILE,
        payload: form,
        callback: (file: {filePath: string}) => {
          setInfo(oldValue => ({...oldValue, avatar: file.filePath}));
        },
      });
    }
  }, [dispatch, media]);

  const _handleSubmit = () => {
    dispatch({type: UPDATE_USER_INFO, payload: info});
  };

  const _renderGender = (value: GenderType) => (
    <TouchableOpacity
      onPress={() => {
        setGender(value);
        setInfo(oldValue => ({...oldValue, gender: value}));
      }}>
      <Block row alignCenter justifyCenter height={48} paddingHorizontal={16} space="between">
        <Text type="semibold" color={gender === value ? COLORS.primary : COLORS.sub_text}>
          {value === 'MALE' ? 'Male' : 'Female'}
        </Text>
        <Block alignCenter justifyCenter height={36}>
          <Block
            alignCenter
            justifyCenter
            round={20}
            borderWidth={2}
            borderColor={gender === value ? COLORS.primary : COLORS.sub_text}>
            <Block round={10} backgroundColor={gender === value ? COLORS.primary : COLORS.secondary_background} />
          </Block>
        </Block>
      </Block>
    </TouchableOpacity>
  );

  return (
    <Block flex backgroundColor="background">
      <Header canGoBack title={t('gadgets.edit_profile.header')} />
      <FormContainer>
        <Block paddingHorizontal={16} paddingVertical={24}>
          <TouchableOpacity onPress={() => setOpenMediaPicker(true)}>
            <Block alignSelf="center">
              <Block round={80} borderWidth={1} borderColor="sub_text" overflow="hidden">
                <Image source={{uri: info.avatar}} round={80} />
              </Block>
              <Block round={24} backgroundColor={COLORS.secondary_background} style={styles.btnCamera}>
                <Image source={ICONS.camera} square={16} tintColor={COLORS.sub_text} resizeMode="contain" />
              </Block>
            </Block>
          </TouchableOpacity>
          <Block paddingTop={16}>
            <TextInput
              label={t('placeholder.name')}
              defaultValue={info.fullName}
              inputStyle={{backgroundColor: COLORS.secondary_background, borderWidth: 0}}
              containerInputStyle={styles.containerInputStyle}
              color={COLORS.sub_text}
              onChangeText={fullName => setInfo(oldValue => ({...oldValue, fullName}))}
            />
            <Block paddingHorizontal={3} style={styles.containerInputStyle}>
              <Text sm marginBottom={8}>
                {t('placeholder.phone_number')}
              </Text>
              <Block row alignCenter>
                <Block
                  row
                  alignCenter
                  marginRight={8}
                  backgroundColor={COLORS.secondary_background}
                  style={styles.phoneInputStyle}>
                  <Text color={COLORS.sub_text} type="semibold">
                    +84
                  </Text>
                  <Image
                    source={ICONS.arrow_down}
                    square={10}
                    tintColor={COLORS.sub_text}
                    style={{marginLeft: getSize.m(12)}}
                  />
                </Block>
                <Block flex justifyCenter backgroundColor={COLORS.secondary_background} style={styles.phoneInputStyle}>
                  <TextInput
                    defaultValue={info.phoneNumber}
                    inputStyle={{backgroundColor: COLORS.secondary_background, borderWidth: 0}}
                    containerInputStyle={styles.containerInputStyle}
                    color={COLORS.sub_text}
                    onChangeText={phoneNumber => setInfo(oldValue => ({...oldValue, phoneNumber}))}
                  />
                </Block>
              </Block>
            </Block>
            <TextInput
              label="Email"
              disabled
              defaultValue={userInfo.email}
              inputStyle={{
                backgroundColor: COLORS.secondary_background,
                borderWidth: getSize.s(0.5),
                borderColor: COLORS.sub_text,
                opacity: 0.5,
              }}
              containerInputStyle={styles.containerInputStyle}
              color={COLORS.sub_text}
            />
            <Block paddingHorizontal={3} style={styles.containerInputStyle}>
              <Text sm marginBottom={8}>
                {t('gadgets.edit_profile.gender_label')}
              </Text>
              <Block radius={8} backgroundColor={COLORS.secondary_background}>
                {_renderGender('MALE')}
                <Block height={1} backgroundColor={COLORS.sub_text} />
                {_renderGender('FEMALE')}
              </Block>
            </Block>
            <Text sm marginBottom={8} marginLeft={3}>
              {t('gadgets.edit_profile.slogan_label')}
            </Text>
            <TextInput
              multiline
              defaultValue={info.slogan}
              inputStyle={{...styles.multilineInputStyle, backgroundColor: COLORS.secondary_background}}
              height={120}
              style={{
                flex: 1,
                height: getSize.s(120),
                fontSize: getSize.m(16),
                color: COLORS.sub_text,
                textAlignVertical: 'top',
                fontWeight: '600',
              }}
              onChangeText={slogan => setInfo(oldValue => ({...oldValue, slogan}))}
            />
          </Block>
        </Block>
      </FormContainer>
      <Block
        safeBottom
        paddingTop={8}
        paddingHorizontal={16}
        borderTopWidth={1}
        borderColor="#87A8B9"
        backgroundColor="secondary_background">
        <GradientButton disabled={isLoading} title={t('button.save')} onPress={_handleSubmit} />
      </Block>
      <ImagePicker
        title={t('gadgets.edit_profile.avatar_picker_header')}
        isOpenBottom={isOpenMediaPicker}
        setIsOpenBottom={setOpenMediaPicker}
        openPicker={openPicker}
        openCamera={openCamera}
      />
      <Loading visible={isLoading} />
    </Block>
  );
};

export default EditProfile;
