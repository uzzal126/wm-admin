const dummyResp = {
  success: true,
  status_code: 200,
  tree: [
    {
      id: 19,
      post_id: 37,
      parent_comment_id: 0,
      customer_id: 0,
      commenter_name: 'Test',
      commenter_email: 'test@gmail.com',
      comment_text: 'Informative',
      emoji: '',
      image_url: '',
      created_at: 1696312897,
      updated_at: 1696312897,
      children: [
        {
          id: 20,
          post_id: 37,
          parent_comment_id: 19,
          customer_id: 0,
          commenter_name: 'Test2',
          commenter_email: 'test2@gmail.com',
          comment_text: 'really?',
          emoji: '',
          image_url: '',
          created_at: 1696326015,
          updated_at: 1696326015,
          children: [
            {
              id: 25,
              post_id: 37,
              parent_comment_id: 20,
              customer_id: 0,
              commenter_name: 'Test',
              commenter_email: 'test2@gmail.com',
              comment_text: 'sdfasd',
              emoji: '',
              image_url: '',
              created_at: 1696404126,
              updated_at: 1696404126,
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 23,
      post_id: 37,
      parent_comment_id: 0,
      customer_id: 0,
      commenter_name: 'Tripto MMBD',
      commenter_email: 'tripto@mmbd.com',
      comment_text: 'Very Good Post',
      emoji: null,
      image_url: 'undefined',
      created_at: 1696398067,
      updated_at: 1696398067,
      children: [],
    },
    {
      id: 24,
      post_id: 37,
      parent_comment_id: 0,
      customer_id: 0,
      commenter_name: 'TriptoAfsin',
      commenter_email: 'afsintripto@gmail.com',
      comment_text: 'Very good from incognito',
      emoji: null,
      image_url: 'undefined',
      created_at: 1696398111,
      updated_at: 1696398111,
      children: [],
    },
  ],
}

export default function NestedComments() {
  return (
    <div className='ms-5 ms-lg-10'>
      <div className='devs-box rounded p-3' id='kt_post_comment_7963' data-kt-reply-id={7963}>
        <div className='mb-0'>
          <div className='d-flex flex-stack flex-wrap'>
            <a href='javascript:void(0)'>
              <div className='d-flex align-items-center py-1'>
                <div className='symbol symbol-30px me-2'>
                  <img
                    src='https://lh3.googleusercontent.com/a/AEdFTp4jOvKt_JS06Pzo07DLPVnj-YN_20qlDNLKz93e=s96-c'
                    alt='user'
                  />
                </div>
                <div className='d-flex flex-column align-items-start justify-content-center'>
                  <span className='d-flex align-items-center text-gray-900 fs-7 fw-bolder lh-1 mb-1'>
                    {' '}
                    Shahzeb Jadoon{' '}
                  </span>
                  <span
                    className='text-muted fs-8 fw-semibold lh-1'
                    data-bs-toggle='tooltip'
                    data-bs-dismiss='click'
                    data-bs-original-title='11 Jan, 2023 6:07 PM UTC'
                    data-kt-initialized={1}
                  >
                    8 months ago
                  </span>
                </div>
              </div>
            </a>
            <div className='d-flex align-items-center py-1 me-n3 gap-2'>
              <button
                className='btn btn-sm btn-bordered btn-active-danger py-2 px-3'
                data-bs-toggle='modal'
                data-bs-target='#page_modal_account_login'
              >
                Delete
              </button>
            </div>
          </div>
          <div
            className='fs-6 fw-normal text-gray-800 overflow-hidden'
            data-kt-element='reply-text'
            data-kt-original-text='Hi I am interested in your position for Reactjs developer. I am a mid level reactjs developer looking forward to talk to you . Thanks'
            data-kt-review=''
            data-kt-public={1}
          >
            <br />
            <p>
              Hi I am interested in your position for Reactjs developer. I am a mid level reactjs
              developer looking forward to talk to you . Thanks
            </p>
          </div>
        </div>
      </div>
      <div className='ms-5 ms-lg-10'>
        <div className='devs-box rounded p-3' id='kt_post_comment_9746' data-kt-reply-id={9746}>
          <div className='mb-0'>
            <div className='d-flex flex-stack flex-wrap'>
              <a href='javascript:void(0)'>
                <div className='d-flex align-items-center py-1'>
                  <div className='symbol symbol-30px me-2'>
                    <img
                      src='https://lh3.googleusercontent.com/a/AItbvmmwpSbO3mgW6jPxSiVtiXdzFoIwmTWiWxrqXT7B=s96-c'
                      alt='user'
                    />
                  </div>
                  <div className='d-flex flex-column align-items-start justify-content-center'>
                    <span className='d-flex align-items-center text-gray-900 fs-7 fw-bolder lh-1 mb-1'>
                      test test{' '}
                    </span>
                    <span
                      className='text-muted fs-8 fw-semibold lh-1'
                      data-bs-toggle='tooltip'
                      data-bs-dismiss='click'
                      data-bs-original-title='29 Mar, 2023 3:23 AM UTC'
                      data-kt-initialized={1}
                    >
                      6 months ago
                    </span>
                  </div>
                </div>
              </a>
              <div className='d-flex align-items-center py-1 me-n3 gap-2'>
                <button
                  className='btn btn-sm btn-bordered btn-active-danger py-2 px-3'
                  data-bs-toggle='modal'
                  data-bs-target='#page_modal_account_login'
                >
                  Delete
                </button>
              </div>
            </div>
            <div
              className='fs-6 fw-normal text-gray-800 overflow-hidden'
              data-kt-element='reply-text'
              data-kt-original-text='test'
              data-kt-review=''
              data-kt-public={1}
            >
              <br />
              <p>
                Hi I am interested in your position for Reactjs developer. I am a mid level reactjs
                developer looking forward to talk to you . Thanks
              </p>
            </div>
            <div data-kt-element='comment-edit' />
          </div>
          <div className='ps-10 mb-0' id='kt_post_comment_9746_wrapper' data-parent-id={9746}>
            <div className='ps-5 ps-lg-10 2' />
          </div>
        </div>
        <div className='ms-5 ms-lg-10'>
          <div
            className='devs-box rounded p-3 mb-7 bg-light'
            id='kt_post_comment_13390'
            data-kt-reply-id={13390}
          >
            <div className='mb-0'>
              <div className='d-flex flex-stack flex-wrap mb-5'>
                <a href='javascript:void(0)'>
                  <div className='d-flex align-items-center py-1'>
                    <div className='symbol symbol-30px me-2'>
                      <img
                        src='https://lh3.googleusercontent.com/a/ACg8ocJ7o91eAi8eZ9_ViGrdNEXVdVItKGPQjrr62yOt51ak=s96-c'
                        alt='user'
                      />
                    </div>
                    <div className='d-flex flex-column align-items-start justify-content-center'>
                      <span className='d-flex align-items-center text-gray-900 fs-7 fw-bolder lh-1 mb-1'>
                        Nick Foster
                      </span>
                      <span
                        className='text-muted fs-8 fw-semibold lh-1'
                        data-bs-toggle='tooltip'
                        data-bs-dismiss='click'
                        data-bs-original-title='02 Oct, 2023 5:21 PM UTC'
                        data-kt-initialized={1}
                      >
                        19 hours ago
                      </span>
                    </div>
                  </div>
                </a>
                <div className='d-flex align-items-center py-1 me-n3 gap-2'>
                  <button
                    className='btn btn-sm btn-bordered btn-active-info py-2 px-3'
                    data-kt-action='restore'
                    data-kt-action-url='https://devs.keenthemes.com/reply/13390/restore'
                  >
                    Restore
                  </button>
                </div>
              </div>
              <div
                className='fs-6 fw-normal text-gray-800 overflow-hidden'
                data-kt-element='reply-text'
                data-kt-original-text='<a href="https://webcapitan.com/blog/wordpress-vs-custom-cms/">ggggg</a>'
                data-kt-review=''
                data-kt-public={1}
              >
                <i>Deleted comment</i>
              </div>
              <div data-kt-element='comment-edit' />
            </div>
            <div className='ps-10 mb-0' id='kt_post_comment_13390_wrapper' data-parent-id={13390}>
              <div className='ps-5 ps-lg-10 2' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
