import { useState, ChangeEvent, useEffect } from 'react'
import cloneDeep from 'lodash/cloneDeep';
import API from 'services/API';
import { noti } from 'components/CustomNotification/Notification';
import { UserObj } from 'actions/reducers/user';
import { updateUser } from 'actions/reducers/user';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface useVerificationProps {
  user: UserObj | null,
  t: any,
}

const useVerification = ({ user, t }: useVerificationProps) => {
  const [digits, setDigits] = useState<string[]>(Array.from({ length: 6 }, () => ''));
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const digitsOnChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const clonedDigits = cloneDeep(digits);
    if (e.target.value) {
      const nextInputRef = document.getElementById(`otp_${index + 1}`);
      if (nextInputRef) nextInputRef.focus();
    }
    clonedDigits[index] = e.target.value;
    setDigits(clonedDigits);
  }

  const resentOTP = () => {

  }

  /**
   * submit otp when all filled
   */
  useEffect(() => {
    // if there is no empty string, call api for verification
    if (digits.every(digit => digit !== '') && user) {
      const otp = digits.join('');
      setLoading(true);
      API.auth.verify(otp, user.email, user.shop_id)
        .then((res) => {
          dispatch(updateUser(res.data));
          noti('success', t('login.verify_success'));
          navigate("/", { replace: true });
        })
        .catch((err) => {
          noti('success', t('login.verify_fail'));
        })
        .finally(() => setLoading(false));
    }
  }, [digits])

  return {
    digits,
    loading,
    digitsOnChange,
    resentOTP,
  }
}

export default useVerification;