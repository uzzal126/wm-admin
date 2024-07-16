import {useFormik} from 'formik'
import {toast} from 'react-toastify'
import * as yup from 'yup'
import {SETTING_UPDATE} from '../../../constants/api.constants'
import {queryRequest} from '../../../library/api.helper'
import {useAuth} from '../../../modules/auth'
import CropperComponents from '../../../modules/components/cropper/CropperComponents'

const schema = yup.object().shape({
  site_title: yup
    .string()
    .test('utf8Length', 'Site title must not exceed 100 UTF-8 characters', function (value) {
      if (!value) {
        // Allow empty values
        return true
      }

      const encoder = new TextEncoder()
      const utf8Bytes = encoder.encode(value)

      return utf8Bytes.length <= 100
    })
    .required('Store name is a required field'),
  business_name: yup
    .string()
    .test('utf8Length', 'Business name must not exceed 100 UTF-8 characters', function (value) {
      if (!value) {
        // Allow empty values
        return true
      }

      const encoder = new TextEncoder()
      const utf8Bytes = encoder.encode(value)

      return utf8Bytes.length <= 100
    }),
  email: yup
    .string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols'),
  msisdn: yup.string().matches(/^(?:\+88|88)?(01[3-9]\d{8})$/, 'Invalid phone number'),
  country: yup.string().required(),
  timezone: yup.string(),
  currency: yup.string(),
  office_address: yup
    .string()
    .test('utf8Length', 'Office address must not exceed 250 UTF-8 characters', function (value) {
      if (!value) {
        // Allow empty values
        return true
      }

      const encoder = new TextEncoder()
      const utf8Bytes = encoder.encode(value)

      return utf8Bytes.length <= 250
    }),
  business_address: yup
    .string()
    .test('utf8Length', 'Business address must not exceed 250 UTF-8 characters', function (value) {
      if (!value) {
        // Allow empty values
        return true
      }

      const encoder = new TextEncoder()
      const utf8Bytes = encoder.encode(value)

      return utf8Bytes.length <= 250
    }),
  seo: yup.object().shape({
    meta_title: yup
      .string()
      .test('utf8Length', 'Meta title must not exceed 250 UTF-8 characters', function (value) {
        if (!value) {
          // Allow empty values
          return true
        }

        const encoder = new TextEncoder()
        const utf8Bytes = encoder.encode(value)

        return utf8Bytes.length <= 250
      }),
    meta_keywords: yup
      .string()
      .test('utf8Length', 'Meta keyword must not exceed 250 UTF-8 characters', function (value) {
        if (!value) {
          // Allow empty values
          return true
        }

        const encoder = new TextEncoder()
        const utf8Bytes = encoder.encode(value)

        return utf8Bytes.length <= 250
      }),
    meta_description: yup
      .string()
      .test(
        'utf8Length',
        'Meta description must not exceed 65500 UTF-8 characters',
        function (value) {
          if (!value) {
            // Allow empty values
            return true
          }

          const encoder = new TextEncoder()
          const utf8Bytes = encoder.encode(value)

          return utf8Bytes.length <= 65500
        }
      ),
    meta_image: yup
      .string()
      .test('utf8Length', 'Meta image path must not exceed 250 UTF-8 characters', function (value) {
        if (!value) {
          // Allow empty values
          return true
        }

        const encoder = new TextEncoder()
        const utf8Bytes = encoder.encode(value)

        return utf8Bytes.length <= 250
      }),
  }),
})

const General = ({data, setData, handleUpdate}) => {
  const initialValues = {
    site_title: data?.store_info?.site_title || '',
    business_name: data?.store_info?.business_name || '',
    email: data?.store_info?.email || '',
    msisdn: data?.store_info?.msisdn || '',
    country: data?.store_info?.country || '',
    timezone: data?.store_info?.timezone || '',
    currency: data?.store_info?.currency || '',
    office_address: data?.store_info?.office_address || '',
    business_address: data?.store_info?.business_address || '',
    seo: {
      meta_title: data?.seo?.meta_title || '',
      meta_keywords: data?.seo?.meta_keywords || '',
      meta_description: data?.seo?.meta_description || '',
      meta_image: data?.seo?.meta_image || '',
    },
  }

  const handleSubmit = async (values) => {
    const res = await queryRequest(SETTING_UPDATE, {
      setting_name: 'store_info',
      setting_data: {...values},
    })
    if (data.seo && Object.keys(data.seo).length > 0) {
      await queryRequest(SETTING_UPDATE, {
        setting_name: 'seo',
        setting_data: {...values.seo},
      })
    }
    if (res.success && res.status_code === 200) {
      toast.success('Setting Updated successfully!')
    } else {
      toast.error(res.message)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  })

  const {auth} = useAuth()

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='card'>
        <div className='card-body'>
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xxl-3 mb-4'>
            <div className='col'>
              <div className='mb-5'>
                <label className='form-label required fw-bold fs-6'>{`${
                  auth?.shop_info?.store_cat_id === 20 ? 'Blog name' : 'Online store name'
                }`}</label>
                <input
                  type='text'
                  className='form-control form-control-solid mb-3 mb-lg-0'
                  placeholder='Enter your Online Store name'
                  {...formik.getFieldProps('site_title')}
                  //value={data?.store_info?.site_title}
                  // onChange={(e) =>
                  //   setData({
                  //     ...data,
                  //     store_info: {
                  //       ...data.store_info,
                  //       site_title: e.target.value,
                  //     },
                  //   })
                  // }
                />
                {formik.errors.site_title && (
                  <div className='text-danger'>{formik.errors.site_title}</div>
                )}
              </div>
            </div>
            <div className='col'>
              <div className='mb-5'>
                <label className='form-label fw-bold fs-6'>Business name</label>
                <input
                  type='text'
                  className='form-control form-control-solid mb-3 mb-lg-0'
                  placeholder='Enter your Business name'
                  {...formik.getFieldProps('business_name')}
                  // value={data?.store_info?.business_name}
                  // onChange={(e) =>
                  //   setData({
                  //     ...data,
                  //     store_info: {
                  //       ...data.store_info,
                  //       business_name: e.target.value,
                  //     },
                  //   })
                  // }
                />
                {formik.errors.business_name && (
                  <div className='text-danger'>{formik.errors.business_name}</div>
                )}
              </div>
            </div>
            <div className='col'>
              <div className='mb-5'>
                <label className='form-label fw-bold fs-6'>Email</label>
                <input
                  type='email'
                  className='form-control form-control-solid mb-3 mb-lg-0'
                  placeholder='Enter your Email'
                  {...formik.getFieldProps('email')}
                  // value={data?.store_info?.email}
                  // onChange={(e) =>
                  //   setData({
                  //     ...data,
                  //     store_info: {
                  //       ...data.store_info,
                  //       email: e.target.value,
                  //     },
                  //   })
                  // }
                />
                {formik.errors.email && <div className='text-danger'>{formik.errors.email}</div>}
              </div>
            </div>
            <div className='col'>
              <div className='mb-5'>
                <label className='form-label fw-bold fs-6'>Phone</label>
                <input
                  type='text'
                  className='form-control form-control-solid mb-3 mb-lg-0'
                  placeholder='Enter your Phone'
                  {...formik.getFieldProps('msisdn')}
                  // value={data?.store_info?.msisdn}
                  // onChange={(e) =>
                  //   setData({
                  //     ...data,
                  //     store_info: {
                  //       ...data.store_info,
                  //       msisdn: e.target.value,
                  //     },
                  //   })
                  // }
                />
                {formik.errors.msisdn && <div className='text-danger'>{formik.errors.msisdn}</div>}
              </div>
            </div>
            <div className='col'>
              <div className='mb-5'>
                <label className='form-label fw-bold fs-6'>
                  <span className='required'>Country</span>
                  <i className='fas fa-exclamation-circle ms-1 fs-7'></i>
                </label>
                <select
                  name='country'
                  {...formik.getFieldProps('country')}
                  // value={data?.store_info?.country}
                  // onChange={(e) =>
                  //   setData({
                  //     ...data,
                  //     store_info: {
                  //       ...data.store_info,
                  //       country: e.target.value,
                  //     },
                  //   })
                  // }
                  className='form-select form-select-solid form-select-lg fw-bold'
                >
                  <option value=''>Select a Country...</option>
                  <option value='AF'>Afghanistan</option>
                  <option value='AX'>Aland Islands</option>
                  <option value='AL'>Albania</option>
                  <option value='DZ'>Algeria</option>
                  <option value='AS'>American Samoa</option>
                  <option value='AD'>Andorra</option>
                  <option value='AO'>Angola</option>
                  <option value='AI'>Anguilla</option>
                  <option value='AG'>Antigua and Barbuda</option>
                  <option value='AR'>Argentina</option>
                  <option value='AM'>Armenia</option>
                  <option value='AW'>Aruba</option>
                  <option value='AU'>Australia</option>
                  <option value='AT'>Austria</option>
                  <option value='AZ'>Azerbaijan</option>
                  <option value='BS'>Bahamas</option>
                  <option value='BH'>Bahrain</option>
                  <option selected value='BD'>
                    Bangladesh
                  </option>
                  <option value='BB'>Barbados</option>
                  <option value='BY'>Belarus</option>
                  <option value='BE'>Belgium</option>
                  <option value='BZ'>Belize</option>
                  <option value='BJ'>Benin</option>
                  <option value='BM'>Bermuda</option>
                  <option value='BT'>Bhutan</option>
                  <option value='BO'>Bolivia, Plurinational State of</option>
                  <option value='BQ'>Bonaire, Sint Eustatius and Saba</option>
                  <option value='BA'>Bosnia and Herzegovina</option>
                  <option value='BW'>Botswana</option>
                  <option value='BR'>Brazil</option>
                  <option value='IO'>British Indian Ocean Territory</option>
                  <option value='BN'>Brunei Darussalam</option>
                  <option value='BG'>Bulgaria</option>
                  <option value='BF'>Burkina Faso</option>
                  <option value='BI'>Burundi</option>
                  <option value='KH'>Cambodia</option>
                  <option value='CM'>Cameroon</option>
                  <option value='CA'>Canada</option>
                  <option value='CV'>Cape Verde</option>
                  <option value='KY'>Cayman Islands</option>
                  <option value='CF'>Central African Republic</option>
                  <option value='TD'>Chad</option>
                  <option value='CL'>Chile</option>
                  <option value='CN'>China</option>
                  <option value='CX'>Christmas Island</option>
                  <option value='CC'>Cocos (Keeling) Islands</option>
                  <option value='CO'>Colombia</option>
                  <option value='KM'>Comoros</option>
                  <option value='CK'>Cook Islands</option>
                  <option value='CR'>Costa Rica</option>
                  <option value='CI'>Côte d'Ivoire</option>
                  <option value='HR'>Croatia</option>
                  <option value='CU'>Cuba</option>
                  <option value='CW'>Curaçao</option>
                  <option value='CZ'>Czech Republic</option>
                  <option value='DK'>Denmark</option>
                  <option value='DJ'>Djibouti</option>
                  <option value='DM'>Dominica</option>
                  <option value='DO'>Dominican Republic</option>
                  <option value='EC'>Ecuador</option>
                  <option value='EG'>Egypt</option>
                  <option value='SV'>El Salvador</option>
                  <option value='GQ'>Equatorial Guinea</option>
                  <option value='ER'>Eritrea</option>
                  <option value='EE'>Estonia</option>
                  <option value='ET'>Ethiopia</option>
                  <option value='FK'>Falkland Islands (Malvinas)</option>
                  <option value='FJ'>Fiji</option>
                  <option value='FI'>Finland</option>
                  <option value='FR'>France</option>
                  <option value='PF'>French Polynesia</option>
                  <option value='GA'>Gabon</option>
                  <option value='GM'>Gambia</option>
                  <option value='GE'>Georgia</option>
                  <option value='DE'>Germany</option>
                  <option value='GH'>Ghana</option>
                  <option value='GI'>Gibraltar</option>
                  <option value='GR'>Greece</option>
                  <option value='GL'>Greenland</option>
                  <option value='GD'>Grenada</option>
                  <option value='GU'>Guam</option>
                  <option value='GT'>Guatemala</option>
                  <option value='GG'>Guernsey</option>
                  <option value='GN'>Guinea</option>
                  <option value='GW'>Guinea-Bissau</option>
                  <option value='HT'>Haiti</option>
                  <option value='VA'>Holy See (Vatican City State)</option>
                  <option value='HN'>Honduras</option>
                  <option value='HK'>Hong Kong</option>
                  <option value='HU'>Hungary</option>
                  <option value='IS'>Iceland</option>
                  <option value='IN'>India</option>
                  <option value='ID'>Indonesia</option>
                  <option value='IR'>Iran, Islamic Republic of</option>
                  <option value='IQ'>Iraq</option>
                  <option value='IE'>Ireland</option>
                  <option value='IM'>Isle of Man</option>
                  <option value='IL'>Israel</option>
                  <option value='IT'>Italy</option>
                  <option value='JM'>Jamaica</option>
                  <option value='JP'>Japan</option>
                  <option value='JE'>Jersey</option>
                  <option value='JO'>Jordan</option>
                  <option value='KZ'>Kazakhstan</option>
                  <option value='KE'>Kenya</option>
                  <option value='KI'>Kiribati</option>
                  <option value='KP'>Korea, Democratic People's Republic of</option>
                  <option value='KW'>Kuwait</option>
                  <option value='KG'>Kyrgyzstan</option>
                  <option value='LA'>Lao People's Democratic Republic</option>
                  <option value='LV'>Latvia</option>
                  <option value='LB'>Lebanon</option>
                  <option value='LS'>Lesotho</option>
                  <option value='LR'>Liberia</option>
                  <option value='LY'>Libya</option>
                  <option value='LI'>Liechtenstein</option>
                  <option value='LT'>Lithuania</option>
                  <option value='LU'>Luxembourg</option>
                  <option value='MO'>Macao</option>
                  <option value='MG'>Madagascar</option>
                  <option value='MW'>Malawi</option>
                  <option value='MY'>Malaysia</option>
                  <option value='MV'>Maldives</option>
                  <option value='ML'>Mali</option>
                  <option value='MT'>Malta</option>
                  <option value='MH'>Marshall Islands</option>
                  <option value='MQ'>Martinique</option>
                  <option value='MR'>Mauritania</option>
                  <option value='MU'>Mauritius</option>
                  <option value='MX'>Mexico</option>
                  <option value='FM'>Micronesia, Federated States of</option>
                  <option value='MD'>Moldova, Republic of</option>
                  <option value='MC'>Monaco</option>
                  <option value='MN'>Mongolia</option>
                  <option value='ME'>Montenegro</option>
                  <option value='MS'>Montserrat</option>
                  <option value='MA'>Morocco</option>
                  <option value='MZ'>Mozambique</option>
                  <option value='MM'>Myanmar</option>
                  <option value='NA'>Namibia</option>
                  <option value='NR'>Nauru</option>
                  <option value='NP'>Nepal</option>
                  <option value='NL'>Netherlands</option>
                  <option value='NZ'>New Zealand</option>
                  <option value='NI'>Nicaragua</option>
                  <option value='NE'>Niger</option>
                  <option value='NG'>Nigeria</option>
                  <option value='NU'>Niue</option>
                  <option value='NF'>Norfolk Island</option>
                  <option value='MP'>Northern Mariana Islands</option>
                  <option value='NO'>Norway</option>
                  <option value='OM'>Oman</option>
                  <option value='PK'>Pakistan</option>
                  <option value='PW'>Palau</option>
                  <option value='PS'>Palestinian Territory, Occupied</option>
                  <option value='PA'>Panama</option>
                  <option value='PG'>Papua New Guinea</option>
                  <option value='PY'>Paraguay</option>
                  <option value='PE'>Peru</option>
                  <option value='PH'>Philippines</option>
                  <option value='PL'>Poland</option>
                  <option value='PT'>Portugal</option>
                  <option value='PR'>Puerto Rico</option>
                  <option value='QA'>Qatar</option>
                  <option value='RO'>Romania</option>
                  <option value='RU'>Russian Federation</option>
                  <option value='RW'>Rwanda</option>
                  <option value='BL'>Saint Barthélemy</option>
                  <option value='KN'>Saint Kitts and Nevis</option>
                  <option value='LC'>Saint Lucia</option>
                  <option value='MF'>Saint Martin (French part)</option>
                  <option value='VC'>Saint Vincent and the Grenadines</option>
                  <option value='WS'>Samoa</option>
                  <option value='SM'>San Marino</option>
                  <option value='ST'>Sao Tome and Principe</option>
                  <option value='SA'>Saudi Arabia</option>
                  <option value='SN'>Senegal</option>
                  <option value='RS'>Serbia</option>
                  <option value='SC'>Seychelles</option>
                  <option value='SL'>Sierra Leone</option>
                  <option value='SG'>Singapore</option>
                  <option value='SX'>Sint Maarten (Dutch part)</option>
                  <option value='SK'>Slovakia</option>
                  <option value='SI'>Slovenia</option>
                  <option value='SB'>Solomon Islands</option>
                  <option value='SO'>Somalia</option>
                  <option value='ZA'>South Africa</option>
                  <option value='KR'>South Korea</option>
                  <option value='SS'>South Sudan</option>
                  <option value='ES'>Spain</option>
                  <option value='LK'>Sri Lanka</option>
                  <option value='SD'>Sudan</option>
                  <option value='SR'>Suriname</option>
                  <option value='SZ'>Swaziland</option>
                  <option value='SE'>Sweden</option>
                  <option value='CH'>Switzerland</option>
                  <option value='SY'>Syrian Arab Republic</option>
                  <option value='TW'>Taiwan, Province of China</option>
                  <option value='TJ'>Tajikistan</option>
                  <option value='TZ'>Tanzania, United Republic of</option>
                  <option value='TH'>Thailand</option>
                  <option value='TG'>Togo</option>
                  <option value='TK'>Tokelau</option>
                  <option value='TO'>Tonga</option>
                  <option value='TT'>Trinidad and Tobago</option>
                  <option value='TN'>Tunisia</option>
                  <option value='TR'>Turkey</option>
                  <option value='TM'>Turkmenistan</option>
                  <option value='TC'>Turks and Caicos Islands</option>
                  <option value='TV'>Tuvalu</option>
                  <option value='UG'>Uganda</option>
                  <option value='UA'>Ukraine</option>
                  <option value='AE'>United Arab Emirates</option>
                  <option value='GB'>United Kingdom</option>
                  <option value='US'>United States</option>
                  <option value='UY'>Uruguay</option>
                  <option value='UZ'>Uzbekistan</option>
                  <option value='VU'>Vanuatu</option>
                  <option value='VE'>Venezuela, Bolivarian Republic of</option>
                  <option value='VN'>Vietnam</option>
                  <option value='VI'>Virgin Islands</option>
                  <option value='YE'>Yemen</option>
                  <option value='ZM'>Zambia</option>
                  <option value='ZW'>Zimbabwe</option>
                </select>
                {formik.errors.country && (
                  <div className='text-danger'>{formik.errors.country}</div>
                )}
              </div>
            </div>
            <div className='col'>
              <div className='mb-5'>
                <label className='form-label fw-bold fs-6'>Time Zone</label>
                <select
                  name='timezone'
                  placeholder='Select a Timezone'
                  {...formik.getFieldProps('timezone')}
                  // value={data?.store_info?.timezone}
                  // onChange={(e) =>
                  //   setData({
                  //     ...data,
                  //     store_info: {
                  //       ...data.store_info,
                  //       timezone: e.target.value,
                  //     },
                  //   })
                  // }
                  className='form-select form-select-solid form-select-lg'
                >
                  <option value=''>Select a Timezone..</option>
                  <option data-bs-offset='-39600' value='International Date Line West'>
                    (GMT-11:00) International Date Line West
                  </option>
                  <option data-bs-offset='-39600' value='Midway Island'>
                    (GMT-11:00) Midway Island
                  </option>
                  <option data-bs-offset='-39600' value='Samoa'>
                    (GMT-11:00) Samoa
                  </option>
                  <option data-bs-offset='-36000' value='Hawaii'>
                    (GMT-10:00) Hawaii
                  </option>
                  <option data-bs-offset='-28800' value='Alaska'>
                    (GMT-08:00) Alaska
                  </option>
                  <option data-bs-offset='-25200' value='Pacific Time (US &amp; Canada)'>
                    (GMT-07:00) Pacific Time (US &amp; Canada)
                  </option>
                  <option data-bs-offset='-25200' value='Tijuana'>
                    (GMT-07:00) Tijuana
                  </option>
                  <option data-bs-offset='-25200' value='Arizona'>
                    (GMT-07:00) Arizona
                  </option>
                  <option data-bs-offset='-21600' value='Mountain Time (US &amp; Canada)'>
                    (GMT-06:00) Mountain Time (US &amp; Canada)
                  </option>
                  <option data-bs-offset='-21600' value='Chihuahua'>
                    (GMT-06:00) Chihuahua
                  </option>
                  <option data-bs-offset='-21600' value='Mazatlan'>
                    (GMT-06:00) Mazatlan
                  </option>
                  <option data-bs-offset='-21600' value='Saskatchewan'>
                    (GMT-06:00) Saskatchewan
                  </option>
                  <option data-bs-offset='-21600' value='Central America'>
                    (GMT-06:00) Central America
                  </option>
                  <option data-bs-offset='-18000' value='Central Time (US &amp; Canada)'>
                    (GMT-05:00) Central Time (US &amp; Canada)
                  </option>
                  <option data-bs-offset='-18000' value='Guadalajara'>
                    (GMT-05:00) Guadalajara
                  </option>
                  <option data-bs-offset='-18000' value='Mexico City'>
                    (GMT-05:00) Mexico City
                  </option>
                  <option data-bs-offset='-18000' value='Monterrey'>
                    (GMT-05:00) Monterrey
                  </option>
                  <option data-bs-offset='-18000' value='Bogota'>
                    (GMT-05:00) Bogota
                  </option>
                  <option data-bs-offset='-18000' value='Lima'>
                    (GMT-05:00) Lima
                  </option>
                  <option data-bs-offset='-18000' value='Quito'>
                    (GMT-05:00) Quito
                  </option>
                  <option data-bs-offset='-14400' value='Eastern Time (US &amp; Canada)'>
                    (GMT-04:00) Eastern Time (US &amp; Canada)
                  </option>
                  <option data-bs-offset='-14400' value='Indiana (East)'>
                    (GMT-04:00) Indiana (East)
                  </option>
                  <option data-bs-offset='-14400' value='Caracas'>
                    (GMT-04:00) Caracas
                  </option>
                  <option data-bs-offset='-14400' value='La Paz'>
                    (GMT-04:00) La Paz
                  </option>
                  <option data-bs-offset='-14400' value='Georgetown'>
                    (GMT-04:00) Georgetown
                  </option>
                  <option data-bs-offset='-10800' value='Atlantic Time (Canada)'>
                    (GMT-03:00) Atlantic Time (Canada)
                  </option>
                  <option data-bs-offset='-10800' value='Santiago'>
                    (GMT-03:00) Santiago
                  </option>
                  <option data-bs-offset='-10800' value='Brasilia'>
                    (GMT-03:00) Brasilia
                  </option>
                  <option data-bs-offset='-10800' value='Buenos Aires'>
                    (GMT-03:00) Buenos Aires
                  </option>
                  <option data-bs-offset='-9000' value='Newfoundland'>
                    (GMT-02:30) Newfoundland
                  </option>
                  <option data-bs-offset='-7200' value='Greenland'>
                    (GMT-02:00) Greenland
                  </option>
                  <option data-bs-offset='-7200' value='Mid-Atlantic'>
                    (GMT-02:00) Mid-Atlantic
                  </option>
                  <option data-bs-offset='-3600' value='Cape Verde Is.'>
                    (GMT-01:00) Cape Verde Is.
                  </option>
                  <option data-bs-offset='0' value='Azores'>
                    (GMT) Azores
                  </option>
                  <option data-bs-offset='0' value='Monrovia'>
                    (GMT) Monrovia
                  </option>
                  <option data-bs-offset='0' value='UTC'>
                    (GMT) UTC
                  </option>
                  <option data-bs-offset='3600' value='Dublin'>
                    (GMT+01:00) Dublin
                  </option>
                  <option data-bs-offset='3600' value='Edinburgh'>
                    (GMT+01:00) Edinburgh
                  </option>
                  <option data-bs-offset='3600' value='Lisbon'>
                    (GMT+01:00) Lisbon
                  </option>
                  <option data-bs-offset='3600' value='London'>
                    (GMT+01:00) London
                  </option>
                  <option data-bs-offset='3600' value='Casablanca'>
                    (GMT+01:00) Casablanca
                  </option>
                  <option data-bs-offset='3600' value='West Central Africa'>
                    (GMT+01:00) West Central Africa
                  </option>
                  <option data-bs-offset='7200' value='Belgrade'>
                    (GMT+02:00) Belgrade
                  </option>
                  <option data-bs-offset='7200' value='Bratislava'>
                    (GMT+02:00) Bratislava
                  </option>
                  <option data-bs-offset='7200' value='Budapest'>
                    (GMT+02:00) Budapest
                  </option>
                  <option data-bs-offset='7200' value='Ljubljana'>
                    (GMT+02:00) Ljubljana
                  </option>
                  <option data-bs-offset='7200' value='Prague'>
                    (GMT+02:00) Prague
                  </option>
                  <option data-bs-offset='7200' value='Sarajevo'>
                    (GMT+02:00) Sarajevo
                  </option>
                  <option data-bs-offset='7200' value='Skopje'>
                    (GMT+02:00) Skopje
                  </option>
                  <option data-bs-offset='7200' value='Warsaw'>
                    (GMT+02:00) Warsaw
                  </option>
                  <option data-bs-offset='7200' value='Zagreb'>
                    (GMT+02:00) Zagreb
                  </option>
                  <option data-bs-offset='7200' value='Brussels'>
                    (GMT+02:00) Brussels
                  </option>
                  <option data-bs-offset='7200' value='Copenhagen'>
                    (GMT+02:00) Copenhagen
                  </option>
                  <option data-bs-offset='7200' value='Madrid'>
                    (GMT+02:00) Madrid
                  </option>
                  <option data-bs-offset='7200' value='Paris'>
                    (GMT+02:00) Paris
                  </option>
                  <option data-bs-offset='7200' value='Amsterdam'>
                    (GMT+02:00) Amsterdam
                  </option>
                  <option data-bs-offset='7200' value='Berlin'>
                    (GMT+02:00) Berlin
                  </option>
                  <option data-bs-offset='7200' value='Bern'>
                    (GMT+02:00) Bern
                  </option>
                  <option data-bs-offset='7200' value='Rome'>
                    (GMT+02:00) Rome
                  </option>
                  <option data-bs-offset='7200' value='Stockholm'>
                    (GMT+02:00) Stockholm
                  </option>
                  <option data-bs-offset='7200' value='Vienna'>
                    (GMT+02:00) Vienna
                  </option>
                  <option data-bs-offset='7200' value='Cairo'>
                    (GMT+02:00) Cairo
                  </option>
                  <option data-bs-offset='7200' value='Harare'>
                    (GMT+02:00) Harare
                  </option>
                  <option data-bs-offset='7200' value='Pretoria'>
                    (GMT+02:00) Pretoria
                  </option>
                  <option data-bs-offset='10800' value='Bucharest'>
                    (GMT+03:00) Bucharest
                  </option>
                  <option data-bs-offset='10800' value='Helsinki'>
                    (GMT+03:00) Helsinki
                  </option>
                  <option data-bs-offset='10800' value='Kiev'>
                    (GMT+03:00) Kiev
                  </option>
                  <option data-bs-offset='10800' value='Kyiv'>
                    (GMT+03:00) Kyiv
                  </option>
                  <option data-bs-offset='10800' value='Riga'>
                    (GMT+03:00) Riga
                  </option>
                  <option data-bs-offset='10800' value='Sofia'>
                    (GMT+03:00) Sofia
                  </option>
                  <option data-bs-offset='10800' value='Tallinn'>
                    (GMT+03:00) Tallinn
                  </option>
                  <option data-bs-offset='10800' value='Vilnius'>
                    (GMT+03:00) Vilnius
                  </option>
                  <option data-bs-offset='10800' value='Athens'>
                    (GMT+03:00) Athens
                  </option>
                  <option data-bs-offset='10800' value='Istanbul'>
                    (GMT+03:00) Istanbul
                  </option>
                  <option data-bs-offset='10800' value='Minsk'>
                    (GMT+03:00) Minsk
                  </option>
                  <option data-bs-offset='10800' value='Jerusalem'>
                    (GMT+03:00) Jerusalem
                  </option>
                  <option data-bs-offset='10800' value='Moscow'>
                    (GMT+03:00) Moscow
                  </option>
                  <option data-bs-offset='10800' value='St. Petersburg'>
                    (GMT+03:00) St. Petersburg
                  </option>
                  <option data-bs-offset='10800' value='Volgograd'>
                    (GMT+03:00) Volgograd
                  </option>
                  <option data-bs-offset='10800' value='Kuwait'>
                    (GMT+03:00) Kuwait
                  </option>
                  <option data-bs-offset='10800' value='Riyadh'>
                    (GMT+03:00) Riyadh
                  </option>
                  <option data-bs-offset='10800' value='Nairobi'>
                    (GMT+03:00) Nairobi
                  </option>
                  <option data-bs-offset='10800' value='Baghdad'>
                    (GMT+03:00) Baghdad
                  </option>
                  <option data-bs-offset='14400' value='Abu Dhabi'>
                    (GMT+04:00) Abu Dhabi
                  </option>
                  <option data-bs-offset='14400' value='Muscat'>
                    (GMT+04:00) Muscat
                  </option>
                  <option data-bs-offset='14400' value='Baku'>
                    (GMT+04:00) Baku
                  </option>
                  <option data-bs-offset='14400' value='Tbilisi'>
                    (GMT+04:00) Tbilisi
                  </option>
                  <option data-bs-offset='14400' value='Yerevan'>
                    (GMT+04:00) Yerevan
                  </option>
                  <option data-bs-offset='16200' value='Tehran'>
                    (GMT+04:30) Tehran
                  </option>
                  <option data-bs-offset='16200' value='Kabul'>
                    (GMT+04:30) Kabul
                  </option>
                  <option data-bs-offset='18000' value='Ekaterinburg'>
                    (GMT+05:00) Ekaterinburg
                  </option>
                  <option data-bs-offset='18000' value='Islamabad'>
                    (GMT+05:00) Islamabad
                  </option>
                  <option data-bs-offset='18000' value='Karachi'>
                    (GMT+05:00) Karachi
                  </option>
                  <option data-bs-offset='18000' value='Tashkent'>
                    (GMT+05:00) Tashkent
                  </option>
                  <option data-bs-offset='19800' value='Chennai'>
                    (GMT+05:30) Chennai
                  </option>
                  <option data-bs-offset='19800' value='Kolkata'>
                    (GMT+05:30) Kolkata
                  </option>
                  <option data-bs-offset='19800' value='Mumbai'>
                    (GMT+05:30) Mumbai
                  </option>
                  <option data-bs-offset='19800' value='New Delhi'>
                    (GMT+05:30) New Delhi
                  </option>
                  <option data-bs-offset='19800' value='Sri Jayawardenepura'>
                    (GMT+05:30) Sri Jayawardenepura
                  </option>
                  <option data-bs-offset='20700' value='Kathmandu'>
                    (GMT+05:45) Kathmandu
                  </option>
                  <option data-bs-offset='21600' value='Astana'>
                    (GMT+06:00) Astana
                  </option>
                  <option data-bs-offset='21600' value='Asia/Dhaka'>
                    (GMT+06:00) Dhaka
                  </option>
                  <option data-bs-offset='21600' value='Almaty'>
                    (GMT+06:00) Almaty
                  </option>
                  <option data-bs-offset='21600' value='Urumqi'>
                    (GMT+06:00) Urumqi
                  </option>
                  <option data-bs-offset='23400' value='Rangoon'>
                    (GMT+06:30) Rangoon
                  </option>
                  <option data-bs-offset='25200' value='Novosibirsk'>
                    (GMT+07:00) Novosibirsk
                  </option>
                  <option data-bs-offset='25200' value='Bangkok'>
                    (GMT+07:00) Bangkok
                  </option>
                  <option data-bs-offset='25200' value='Hanoi'>
                    (GMT+07:00) Hanoi
                  </option>
                  <option data-bs-offset='25200' value='Jakarta'>
                    (GMT+07:00) Jakarta
                  </option>
                  <option data-bs-offset='25200' value='Krasnoyarsk'>
                    (GMT+07:00) Krasnoyarsk
                  </option>
                  <option data-bs-offset='28800' value='Beijing'>
                    (GMT+08:00) Beijing
                  </option>
                  <option data-bs-offset='28800' value='Chongqing'>
                    (GMT+08:00) Chongqing
                  </option>
                  <option data-bs-offset='28800' value='Hong Kong'>
                    (GMT+08:00) Hong Kong
                  </option>
                  <option data-bs-offset='28800' value='Kuala Lumpur'>
                    (GMT+08:00) Kuala Lumpur
                  </option>
                  <option data-bs-offset='28800' value='Singapore'>
                    (GMT+08:00) Singapore
                  </option>
                  <option data-bs-offset='28800' value='Taipei'>
                    (GMT+08:00) Taipei
                  </option>
                  <option data-bs-offset='28800' value='Perth'>
                    (GMT+08:00) Perth
                  </option>
                  <option data-bs-offset='28800' value='Irkutsk'>
                    (GMT+08:00) Irkutsk
                  </option>
                  <option data-bs-offset='28800' value='Ulaan Bataar'>
                    (GMT+08:00) Ulaan Bataar
                  </option>
                  <option data-bs-offset='32400' value='Seoul'>
                    (GMT+09:00) Seoul
                  </option>
                  <option data-bs-offset='32400' value='Osaka'>
                    (GMT+09:00) Osaka
                  </option>
                  <option data-bs-offset='32400' value='Sapporo'>
                    (GMT+09:00) Sapporo
                  </option>
                  <option data-bs-offset='32400' value='Tokyo'>
                    (GMT+09:00) Tokyo
                  </option>
                  <option data-bs-offset='32400' value='Yakutsk'>
                    (GMT+09:00) Yakutsk
                  </option>
                  <option data-bs-offset='34200' value='Darwin'>
                    (GMT+09:30) Darwin
                  </option>
                  <option data-bs-offset='34200' value='Adelaide'>
                    (GMT+09:30) Adelaide
                  </option>
                  <option data-bs-offset='36000' value='Canberra'>
                    (GMT+10:00) Canberra
                  </option>
                  <option data-bs-offset='36000' value='Melbourne'>
                    (GMT+10:00) Melbourne
                  </option>
                  <option data-bs-offset='36000' value='Sydney'>
                    (GMT+10:00) Sydney
                  </option>
                  <option data-bs-offset='36000' value='Brisbane'>
                    (GMT+10:00) Brisbane
                  </option>
                  <option data-bs-offset='36000' value='Hobart'>
                    (GMT+10:00) Hobart
                  </option>
                  <option data-bs-offset='36000' value='Vladivostok'>
                    (GMT+10:00) Vladivostok
                  </option>
                  <option data-bs-offset='36000' value='Guam'>
                    (GMT+10:00) Guam
                  </option>
                  <option data-bs-offset='36000' value='Port Moresby'>
                    (GMT+10:00) Port Moresby
                  </option>
                  <option data-bs-offset='36000' value='Solomon Is.'>
                    (GMT+10:00) Solomon Is.
                  </option>
                  <option data-bs-offset='39600' value='Magadan'>
                    (GMT+11:00) Magadan
                  </option>
                  <option data-bs-offset='39600' value='New Caledonia'>
                    (GMT+11:00) New Caledonia
                  </option>
                  <option data-bs-offset='43200' value='Fiji'>
                    (GMT+12:00) Fiji
                  </option>
                  <option data-bs-offset='43200' value='Kamchatka'>
                    (GMT+12:00) Kamchatka
                  </option>
                  <option data-bs-offset='43200' value='Marshall Is.'>
                    (GMT+12:00) Marshall Is.
                  </option>
                  <option data-bs-offset='43200' value='Auckland'>
                    (GMT+12:00) Auckland
                  </option>
                  <option data-bs-offset='43200' value='Wellington'>
                    (GMT+12:00) Wellington
                  </option>
                  <option data-bs-offset='46800' value="Nuku'alofa">
                    (GMT+13:00) Nuku'alofa
                  </option>
                </select>
                {formik.errors.timezone && (
                  <div className='text-danger'>{formik.errors.timezone}</div>
                )}
              </div>
            </div>
            <div className='col'>
              <label className='form-label fw-bold fs-6'>Currency</label>
              <div className='fv-row'>
                <select
                  name='currnecy'
                  {...formik.getFieldProps('currency')}
                  // value={data?.store_info?.currency}
                  // onChange={(e) =>
                  //   setData({
                  //     ...data,
                  //     store_info: {
                  //       ...data.store_info,
                  //       currency: e.target.value,
                  //     },
                  //   })
                  // }
                  placeholder='Select a currency..'
                  className='form-select form-select-solid form-select-lg'
                >
                  <option value=''>Select a currency..</option>
                  <option data-kt-flag='flags/united-states.svg' value='$'>
                    USD &#160;-&#160;USA dollar
                  </option>
                  <option data-kt-flag='flags/bangladesh.svg' value='৳'>
                    BDT &#160;-&#160;Bangladeshi Taka
                  </option>
                  <option data-kt-flag='flags/united-kingdom.svg' value='£'>
                    GBP &#160;-&#160;British pound
                  </option>
                  <option data-kt-flag='flags/australia.svg' value='$'>
                    AUD &#160;-&#160;Australian dollar
                  </option>
                  <option data-kt-flag='flags/japan.svg' value='¥'>
                    JPY &#160;-&#160;Japanese yen
                  </option>
                  <option data-kt-flag='flags/sweden.svg' value='kr'>
                    SEK &#160;-&#160;Swedish krona
                  </option>
                  <option data-kt-flag='flags/canada.svg' value='$'>
                    CAD &#160;-&#160;Canadian dollar
                  </option>
                  <option data-kt-flag='flags/switzerland.svg' value='CHF'>
                    CHF &#160;-&#160;Swiss franc
                  </option>
                </select>
                {formik.errors.currency && (
                  <div className='text-danger'>{formik.errors.currency}</div>
                )}
              </div>
            </div>
            <div className='col'>
              <div className='mb-5'>
                <label className='form-label fw-bold fs-6'>Office Address</label>
                <textarea
                  className='form-control form-control-solid mb-3 mb-lg-0'
                  placeholder='Enter your office address'
                  {...formik.getFieldProps('office_address')}
                  // value={data?.store_info?.office_address}
                  // onChange={(e) =>
                  //   setData({
                  //     ...data,
                  //     store_info: {
                  //       ...data.store_info,
                  //       office_address: e.target.value,
                  //     },
                  //   })
                  // }
                />
                {formik.errors.office_address && (
                  <div className='text-danger'>{formik.errors.office_address}</div>
                )}
              </div>
            </div>
            <div className='col'>
              <div className='mb-5'>
                <label className='form-label fw-bold fs-6'>Business Address</label>
                <textarea
                  className='form-control form-control-solid mb-3 mb-lg-0'
                  placeholder='Enter your office address'
                  {...formik.getFieldProps('business_address')}
                  // value={data?.store_info?.business_address}
                  // onChange={(e) =>
                  //   setData({
                  //     ...data,
                  //     store_info: {
                  //       ...data.store_info,
                  //       business_address: e.target.value,
                  //     },
                  //   })
                  // }
                />
                {formik.errors.business_address && (
                  <div className='text-danger'>{formik.errors.business_address}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='card mt-2'>
        <div className='card-body'>
          <h2>Provide (SEO) Information</h2>
          <div className='row'>
            <div className='col'>
              <div className='mb-3'>
                <label className='form-label'>Meta title</label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  {...formik.getFieldProps('seo.meta_title')}
                  // value={data?.seo?.meta_title}
                  // onChange={(e) =>
                  //   setData({
                  //     ...data,
                  //     seo: {
                  //       ...data.seo,
                  //       meta_title: e.target.value,
                  //     },
                  //   })
                  // }
                />
                {formik.errors.seo?.meta_title && (
                  <div className='text-danger'>{formik.errors.seo?.meta_title}</div>
                )}
              </div>
            </div>
            <div className='col'>
              <div className='mb-3'>
                <label className='form-label'>Meta keywords</label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  placeholder='Online Store, Ecommerce'
                  {...formik.getFieldProps('seo.meta_keywords')}
                  // value={data?.seo?.meta_keywords}
                  // onChange={(e) =>
                  //   setData({
                  //     ...data,
                  //     seo: {
                  //       ...data.seo,
                  //       meta_keywords: e.target.value,
                  //     },
                  //   })
                  // }
                />
                {formik.errors.seo?.meta_keywords && (
                  <div className='text-danger'>{formik.errors.seo?.meta_keywords}</div>
                )}
              </div>
            </div>
          </div>
          <div className='mb-3'>
            <label className='form-label'>Meta description</label>
            <textarea
              className='form-control form-control-solid'
              {...formik.getFieldProps('seo.meta_description')}
              // value={data?.seo?.meta_description}
              rows={5}
              // onChange={(e) =>
              //   setData({
              //     ...data,
              //     seo: {
              //       ...data.seo,
              //       meta_description: e.target.value,
              //     },
              //   })
              // }
            />
            {formik.errors.seo?.meta_description && (
              <div className='text-danger'>{formik.errors.seo?.meta_description}</div>
            )}
          </div>
          <div className='mb-3'>
            <label className='d-block mb-2'>Meta Image (1200px x 630px) *</label>
            <div>
              <CropperComponents
                src={formik?.values?.seo?.meta_image || ''}
                onCroped={
                  (url) => formik.setFieldValue('seo.meta_image', url[0])
                  // setData({
                  //   ...data,
                  //   seo: {
                  //     ...data.seo,
                  //     meta_image: url[0],
                  //   },
                  // })
                }
                width={1200}
                height={630}
                className={'w-600px h-325px'}
                full={false}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-end bg-white pb-3'>
        <button type='submit' className='btn btn-dark btn-sm'>
          SAVE CHANGE
        </button>
      </div>
    </form>
  )
}

export default General
