import moment from 'moment'

export const initialFormData = {
  title: '',
  slug: '',
  description: '',
  status_id: 3,
  cat_ids: [],
  thumbnail: {
    alt: '',
    src: '',
  },
  banner: {
    alt: '',
    caption: '',
    src: '',
  },
  scheduled_at: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  seo: {
    title: '',
    description: '',
    keywords: '',
  },
}
