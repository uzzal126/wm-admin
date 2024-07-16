import $ from 'jquery'
import {useState} from 'react'
import CategoryTree from '../_modals/CategoryTree'
import CategoryContents from './CategoryContents'
const data = {
  core: {
    data: [
      {
        children: [
          {
            children: [
              {
                id: 11,
                slug: 'mobile-accessaries',
                text: 'Mobile Accessaries',
                image: 'https://api.webmanza.com/images/product_test_image/18.jpg',
                position: 0,
                __depth: 2,
              },
              {
                id: 14,
                slug: 'men-accessaries',
                text: "Men's Accessaries",
                image: 'https://api.webmanza.com/images/product_test_image/17.jpg',
                position: 3,
                __depth: 2,
              },
              {
                id: 15,
                slug: 'smart-phone',
                text: 'Smart Phone',
                image: 'https://api.webmanza.com/images/product_test_image/2-5.jpg',
                position: 3,
                __depth: 2,
              },
              {
                id: 16,
                slug: 'feature-phone',
                text: 'Feature Phone',
                image: 'https://api.webmanza.com/images/product_test_image/2-2.jpg',
                position: 3,
                __depth: 2,
              },
            ],
            id: 3,
            slug: 'mobile',
            text: 'Mobile',
            image:
              'https://api.webmanza.com/images/product_test_image/girl-powers-stilll-life-design.jpg',
            position: 0,
            __depth: 1,
          },
          {
            id: 5,
            slug: 'computers',
            text: 'Computers',
            image:
              'https://api.webmanza.com/images/product_test_image/woman-s-hand-showing-power-thunders.jpg',
            position: 0,
            __depth: 1,
          },
          {
            id: 6,
            slug: 'tablets',
            text: 'Tablets',
            image: 'https://api.webmanza.com/images/product_test_image/6447705.jpg',
            position: 0,
            __depth: 1,
          },
          {
            id: 7,
            slug: 'appliances',
            text: 'Appliances',
            image:
              'https://api.webmanza.com/images/product_test_image/Black-Friday-Social-Media-Banner-12.jpg',
            position: 0,
            __depth: 1,
          },
          {
            id: 27,
            slug: 'women-clothing',
            text: null,
            image:
              'http://localhost:8283/assets/category/eyjzdwiiojesimlhdci6mty0odk2mjaznywizxhwijoxnjq5nty2odm3fq_cat_image.png',
            position: 1,
            __depth: 1,
          },
          {
            id: 30,
            slug: 'women-clothingrr',
            text: null,
            image:
              'http://localhost:8283/assets/category/eyjzdwiiojesimlhdci6mty0odk2mjaznywizxhwijoxnjq5nty2odm3fq_cat_image.png',
            position: 1,
            __depth: 1,
          },
          {
            id: 32,
            slug: 'women-clothingrrds',
            text: null,
            image:
              'http://localhost:8283/assets/category/eyjzdwiiojesimlhdci6mty0odk2mjaznywizxhwijoxnjq5nty2odm3fq_cat_image.png',
            position: 1,
            __depth: 1,
          },
          {
            id: 34,
            slug: 'women-clothingrrdseruiut',
            text: 'women clothingresas',
            image:
              'http://localhost:8283/assets/category/eyjzdwiiojesimlhdci6mty0odk2mjaznywizxhwijoxnjq5nty2odm3fq_cat_image.png',
            position: 1,
            __depth: 1,
          },
          {
            id: 36,
            slug: 'women-clothing dress',
            text: 'women clothingresas',
            image:
              'http://localhost:8283/assets/category/eyjzdwiiojesimlhdci6mty0odk2mjaznywizxhwijoxnjq5nty2odm3fq_cat_image.png',
            position: 1,
            __depth: 1,
          },
          {
            id: 43,
            slug: 'women-clothing dresse',
            text: 'women clothingresas',
            image:
              'http://localhost:8283/assets/category/eyjzdwiiojesimlhdci6mty1mdqzntu2nywizxhwijoxnjuxmdqwmzy3fq_cat_image.jpg',
            position: 1,
            __depth: 1,
          },
        ],
        id: 1,
        slug: 'electronics',
        text: 'Electronics',
        image: 'https://api.webmanza.com/images/product_test_image/5-3-2.jpg',
        position: 0,
        __depth: 0,
      },
      {
        children: [
          {
            id: 8,
            slug: 'men-clothing',
            text: "Men's Clothing",
            image:
              'https://api.webmanza.com/images/product_test_image/29_YmxhY2tmcmlkYXlfYmFubmVyLTJfMw.jpg',
            position: 0,
            __depth: 1,
          },
          {
            id: 9,
            slug: 'women-clothing',
            text: "Women's Clothing",
            image:
              'https://api.webmanza.com/images/product_test_image/nature_sunset_river_with_plant_and_rock_podium_square.jpg',
            position: 0,
            __depth: 1,
          },
          {
            id: 10,
            slug: 'kid-wear',
            text: "Kid's Wear",
            image: 'https://api.webmanza.com/images/product_test_image/47.jpg',
            position: 0,
            __depth: 1,
          },
        ],
        id: 2,
        slug: 'clothing-wears',
        text: 'Clothing & Wears',
        image: 'https://api.webmanza.com/images/product_test_image/2-2.jpg',
        position: 0,
        __depth: 0,
      },
      {
        children: [
          {
            id: 12,
            slug: 'women-accessaries',
            text: "Women's Accessaries",
            image: 'https://api.webmanza.com/images/product_test_image/ORVX5A0.jpg',
            position: 3,
            __depth: 1,
          },
          {
            id: 13,
            slug: 'men-accessaries',
            text: "Men's Accessaries",
            image:
              'https://api.webmanza.com/images/product_test_image/Black-Friday-Social-Media-Banner-12.jpg',
            position: 3,
            __depth: 1,
          },
        ],
        id: 4,
        slug: 'accessaries-extras',
        text: 'Accessaries & Extras',
        image: 'https://api.webmanza.com/images/product_test_image/2-5.jpg',
        position: 0,
        __depth: 0,
      },
    ],
    animation: 0,
    check_callback: true,
  },
  types: {
    default: {
      valid_children: ['default', 'file'],
      icon: 'fa fa-folder text-success',
    },
    file: {
      icon: 'fa fa-file  text-success',
    },
    open: {
      icon: 'fa fa-folder-open  text-success',
    },
    closed: {
      icon: 'fa fa-folder  text-success',
    },
  },
  plugins: ['contextmenu', 'dnd', 'search', 'state', 'types', 'wholerow'],
}

export const CategoryPageF = () => {
  const [selected, setSelected] = useState([])
  const [slug, setSlug] = useState('')
  const [pagination, setPagination] = useState('')
  const handleOnCreate = () => {
    var ref = $('.jstree').jstree(true),
      id = ref.get_selected()
    if (!id.length) {
      return false
    }
    id = id[0]
    id = ref.create_node(id, {type: 'file'})
    if (id) {
      ref.edit(id)
    }
  }

  const handleOnRename = () => {
    var ref = $('.jstree').jstree(true),
      id = ref.get_selected()

    if (!id.length) {
      return false
    }
    id = id[0]
    ref.edit(id)
  }

  const handleOnDelete = () => {
    var jsTreeContainer = $('.jstree')
    var treeRef = jsTreeContainer.jstree('get_selected', true)['0'],
      ref = jsTreeContainer.jstree(true),
      sel = ref.get_selected()

    if (!sel.length) {
      return false
    }
    ref.delete_node(sel)
  }

  const handleChange = (e, data) => {
    // // console.log('e', e)
    // // console.log('data', data)
    if (data.action === 'select_node') {
      setSelected(data)
      updateSlug()
    }
  }

  const handleRename = (e, data) => {
    // console.log('e', e)
    // console.log('data', data)
  }
  const handleDelete = (e, data) => {
    // console.log('e', e)
    // console.log('data', data)
  }
  const handleMove = (e, data) => {
    // console.log('e', e)
    // console.log('data', data)
  }

  const updateSlug = () => {
    if (selected) {
      var data = selected

      var txt = '',
        tempTxt = '<ul class="list-group border-0 list-group-horizontal w-100">',
        cSlug = ''

      var prds = data?.node.parents
      for (let index = prds.length - 1; index >= 0; index--) {
        const element = data.instance.get_node(prds[index]).text
        if (element)
          tempTxt +=
            "<li class='list-group-item border-0 ps-2 pe-0'>" +
            element +
            "<i class='fas fa-arrow-right ms-2'></i></li>"
      }
      var nm = data.newText || data?.node.text || data?.node.original.text
      tempTxt += "<li class='list-group-item border-0 ps-2 last text-muted'>" + nm + '</li>'

      cSlug = data?.node.original.slug || linkify(data.newSlug) || linkify(data?.node.text)
      txt = tempTxt
      // this.setState({
      //     slug: cSlug,
      //     pagination: txt
      // })
      setSlug(cSlug)
      setPagination(txt)
    }
  }

  const linkify = (str = '') => {
    str = str.replace(/^\s+|\s+$/g, '') // trim
    str = str.toLowerCase()

    var from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;'
    var to = 'aaaaaeeeeeiiiiooooouuuunc------'
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    str = str
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

    return str
  }

  return (
    <div className='row'>
      <div className='col-lg-4 mb-8 mb-lg-0'>
        <div className='card'>
          <div className='card-header min-h-auto p-2 d-flex justify-content-start'>
            <button
              type='button'
              className='btn btn-light-success btn-sm px-3 py-2 me-3'
              onClick={handleOnCreate}
            >
              <i className='fas fa-plus'></i>
              Category
            </button>
            <button
              type='button'
              onClick={handleOnRename}
              className='btn btn-light-warning btn-sm px-3 py-2 me-3'
            >
              <i className='fas fa-pencil-alt'></i>
              Category
            </button>
            <button
              type='button'
              onClick={handleOnDelete}
              className='btn btn-light-danger btn-sm px-3 py-2'
            >
              <i className='fas fa-trash'></i>
              Category
            </button>
          </div>
          <div className='card-body p-2'>
            <CategoryTree
              data={data}
              handleChange={(e, data) => handleChange(e, data)}
              handleRename={(e, data) => handleRename(e, data)}
              handleDelete={(e, data) => handleDelete(e, data)}
              handleMove={(e, data) => handleMove(e, data)}
            />
          </div>
        </div>
      </div>
      <div className='col'>
        {selected && <CategoryContents slug={slug} pagination={pagination} />}
      </div>
    </div>
  )
}
