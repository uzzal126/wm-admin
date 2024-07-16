import TreeView from 'react-simple-jstree2'

const CategoryTree = ({data, handleChange, handleRename, handleDelete, handleMove}) => {
  // // console.log('data: ', data);
  return (
    <div>
      <TreeView
        treeData={data}
        onChange={(e, data) => handleChange(e, data)}
        onRename={(e, data) => handleRename(e, data)}
        onDelete={(e, data) => handleDelete(e, data)}
        onMove={(e, data) => handleMove(e, data)}
      />
    </div>
  )
}

export default CategoryTree
