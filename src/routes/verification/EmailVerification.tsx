import { FC, Suspense, useMemo } from 'react';
import s from './EmailVerification.module.scss';
import { useSelector } from "react-redux";
import { RootState } from 'actions/store';
import useVerification from './useVerification';
import { withTranslation } from 'react-i18next';
import cx from 'classnames';

interface EmailVerificationProps {
  t: any,
}

const EmailVerification: FC<EmailVerificationProps> = ({ t }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const email = useMemo(() => {
    if (!user) return '';
    return user.email || ''
  }, [user])

  const {
    digits,
    loading,
    digitsOnChange,
    resentOTP,
  } = useVerification({ user, t });


  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className={s.root}>
        <div className={s.imgContainer}>
          <img src='/assets/images/otp.jpg' alt='' />
        </div>
        <div className={s.title}>OTP Code Verification</div>
        <div className={s.desc}>
          <p>
            {t('login.otp_desc_1')}
            <span>{email}</span>
            {t('login.otp_desc_2')}
          </p>
        </div>
        <div className={s.digitContainer}>
          {digits.map((digit, index) => (<input
            id={`otp_${index}`}
            key={`otp_${index}`}
            pattern="\d*"
            maxLength={1}
            value={digit}
            disabled={loading}
            onChange={(e) => digitsOnChange(e, index)}
          />))}
        </div>
        <div className={s.center}>
          {t('login.resent_otp_1')}
        </div>
        <div className={cx(s.center, s.resentBtnContainer)}>
          <a onClick={resentOTP}>
            {t('login.resent_otp_2')}
          </a>
        </div>
      </div>
    </Suspense >
  )
}

export default withTranslation()(EmailVerification);