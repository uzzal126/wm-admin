import $ from 'jquery'
import {Component} from 'react'
import {toast} from 'react-toastify'
import slugify from 'react-url-slugify'
import swal from 'sweetalert'
import {Can} from '../../../../../_metronic/redux/ability'
import {CATEGORY_SORT} from '../../../../constants/api.constants'
import {addCategory, deleteCategory, queryRequest} from '../../../../library/api.helper'
import {calculateUtf8Length} from '../../../../modules/helper/misc'
import CategoryTree from '../_modals/CategoryTree'
import CategoryContents from './CategoryContents'

class CategoryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        core: {
          data: props.data,
          animation: 1,
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
        themes: {
          theme: 'default',
          dots: true,
        },
        plugins: ['themes', 'contextmenu', 'dnd', 'search', 'state', 'types', 'wholerow'],
      },
      selected: {},
      pagination: '',
      slug: '',
      selectedId: '',
    }
  }

  handleOnCreate = () => {
    var ref = $('.jstree').jstree(true),
      id = ref.get_selected()

    if (id.length > 0) {
      id = id[0]
      id = ref.create_node(id, {
        text: 'New Sub Category',
      })
      if (id) {
        ref.edit(id)
      }
    } else {
      id = ref.create_node(
        null,
        {
          text: 'New Category',
        },
        'last'
      )
      if (id) {
        ref.edit(id)
      }
    }
  }

  handleOnRename = () => {
    var ref = $('.jstree').jstree(true),
      id = ref.get_selected()
    if (!id.length) {
      return false
    }
    id = id[0]
    ref.edit(id)
  }

  handleOnDelete = (e) => {
    var jsTreeContainer = $('.jstree')
    var treeRef = jsTreeContainer.jstree('get_selected', true)['0'],
      ref = jsTreeContainer.jstree(true),
      sel = ref.get_selected()
    if (!sel.length) {
      return false
    }
    const data = {
      node: treeRef,
    }
    this.handleDelete(e, data)
  }

  handleChange = (e, data) => {
    if (data.action === 'select_node') {
      if (this.state.selectedId === data?.node?.id) {
        this.setState({
          selected: [],
          selectedId: '',
        })
        data.instance.deselect_node(data?.node)
      } else {
        this.setState({
          selected: data,
          selectedId: data?.node?.id,
        })
        this.updateSlug(data)
      }
    }
  }

  handleRename = async (e, data) => {
    if (this.props.ability('Add Category', 'products')) {
      const parent = data?.node.parent === '#' ? 0 : data?.node.parent
      console.log(data?.node?.text)
      if (calculateUtf8Length(data?.node?.text) > 250) {
        toast.error('Maximum 250 utf8 length is allowed for category name!')
        return
      }

      let slug = slugify(data?.node.text)
      const resp = await addCategory(
        parent,
        data?.node?.text.replace(/&amp;/g, '&'),
        slug.replace(/andamp/g, 'and'),
        parseInt(data?.node.id)
      )

      if (resp.success) {
        // $('.jstree')?.jstree(true)?.set_id(data?.node, resp.catid)
        this.props.reFatch()
        toast(resp.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      } else {
        toast.error(resp.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    } else {
      toast.error('Access denied')
    }
  }

  handleDelete = async (e, data) => {
    if (this.props.ability('Delete Category', 'products')) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this category',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          const resp = await deleteCategory(data?.node.id)
          if (resp.success) {
            var jsTreeContainer = $('.jstree')
            var treeRef = jsTreeContainer.jstree('get_selected', true)['0'],
              ref = jsTreeContainer.jstree(true),
              sel = ref.get_selected()

            if (!sel.length) {
              return false
            }
            ref.delete_node(sel)
            this.props.reFatch()
            toast(resp.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          } else {
            // $('.jstree').jstree(true).refresh();
            toast.error(resp.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          }
        } else {
          // $('.jstree').jstree(true).refresh();
        }
      })
    } else {
      toast.error('Access denied')
    }
  }

  handleMove = async (e, data) => {
    if (this.props.ability('Category Sort', 'products')) {
      let newData = this.props.data
      let itemId = data.node.id,
        oldParentId = data.old_parent === '#' ? -1 : data.old_parent,
        newParentId = data.parent === '#' ? -1 : data.parent,
        newPosition = data.position

      // console.log(newParentId)

      const move = this.moveItem(
        newData,
        Number(itemId),
        Number(oldParentId),
        Number(newParentId),
        Number(newPosition)
      )

      if (move) {
        let post = this.simplifyData(move)
        // console.log(post)
        const res = await queryRequest(CATEGORY_SORT, {data: post})
        if (res.success && res.status_code === 200) {
          this.props.reFatch()
          toast.success(res.message)
        } else {
          toast.error(res.message)
        }
      }
    } else {
      toast.error('Access denied')
    }
  }

  simplifyData(inputData) {
    const uniqueIds = new Set()
    const filteredData = inputData.filter((item) => {
      if (uniqueIds.has(item.id)) {
        return false
      } else {
        uniqueIds.add(item.id)
        return true
      }
    })

    return filteredData.map((item, index) => {
      const simplifiedItem = {
        id: item.id,
        parent_id: item.parent_id,
        position: index,
      }

      if (item.children) {
        simplifiedItem.children = this.simplifyData(item.children)
      }

      return simplifiedItem
    })
  }

  findNode(tree, id) {
    for (const node of tree) {
      if (node.id === id) {
        return node
      } else if (node.children) {
        const foundNode = this.findNode(node.children, id)
        if (foundNode) {
          return foundNode
        }
      }
    }
    return null
  }

  moveItem(tree, itemId, oldParentId, newParentId, newPosition) {
    const item = this.findNode(tree, itemId)
    const oldParent = oldParentId > 0 ? this.findNode(tree, oldParentId) : null
    const newParent = newParentId > 0 ? this.findNode(tree, newParentId) : null

    // console.log(item)
    if (!item) {
      return
    }

    // Remove the item from the old parent's children array, if it has a parent
    if (oldParent) {
      const indexToRemove = oldParent.children.findIndex((child) => child.id === itemId)
      oldParent.children.splice(indexToRemove, 1)
    } else {
      const indexToRemove = tree.findIndex((node) => node.id === itemId)
      tree.splice(indexToRemove, 1)
    }

    // Insert the item into the new parent's children array at the desired position, or add it to the root
    if (newParent) {
      // Ensure the new parent has a 'children' property
      if (!newParent.children) {
        newParent.children = []
      }
      newParent.children.splice(newPosition, 0, item)
    } else {
      tree.splice(newPosition, 0, {...item, parent_id: 0})
    }
    return tree
  }

  updateSlug(data) {
    if (this.state.selected) {
      //   // console.log(this.state)

      var txt = '',
        tempTxt = '<ul class="list-group border-0 list-group-horizontal w-100">',
        cSlug = ''

      var prds = data?.node?.parents
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

      cSlug = data?.node.original.slug || slugify(data.newSlug) || slugify(data?.node.text)
      txt = tempTxt
      this.setState({
        slug: cSlug,
        pagination: txt,
      })
    }
  }

  render() {
    const data = this.state.data

    return (
      <div className='row'>
        <div className='col-lg-4 mb-8 mb-lg-0'>
          <div className='card'>
            <div className='card-header min-h-auto p-2 d-flex justify-content-start'>
              <Can access='Add Category' group='products'>
                <button
                  type='button'
                  className='btn btn-light-success btn-sm px-3 py-2 me-3'
                  onClick={this.handleOnCreate}
                >
                  <i className='fas fa-plus'></i>
                  Add
                </button>
              </Can>
              <Can access='Edit Category' group='products'>
                <button
                  type='button'
                  onClick={this.handleOnRename}
                  className='btn btn-light-warning btn-sm px-3 py-2 me-3'
                >
                  <i className='fas fa-pencil-alt'></i>
                  Edit
                </button>
              </Can>
              <Can access='Delete Category' group='products'>
                <button
                  type='button'
                  onClick={this.handleOnDelete}
                  className='btn btn-light-danger btn-sm px-3 py-2'
                >
                  <i className='fas fa-trash'></i>
                  Delete
                </button>
              </Can>
            </div>
            <div className='card-body p-2'>
              <CategoryTree
                data={data}
                handleChange={(e, data) => this.handleChange(e, data)}
                handleRename={(e, data) => this.handleRename(e, data)}
                handleDelete={(e, data) => this.handleDelete(e, data)}
                handleMove={(e, data) => this.handleMove(e, data)}
              />
            </div>
          </div>
        </div>
        <div className='col'>
          {this.state.selected.node && (
            <CategoryContents
              slug={this.state.slug}
              pagination={this.state.pagination}
              category={this.state.selected.node}
              refetch={this.props.reFatch}
            />
          )}
        </div>
      </div>
    )
  }
}

export default CategoryPage
