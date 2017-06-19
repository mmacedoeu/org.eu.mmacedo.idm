import React from 'react'
import PropTypes from 'prop-types'
import {Table, Modal} from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import {DropOption} from '../../components'
import {Link} from 'dva/router'

const confirm = Modal.confirm

const List = ({
  onDeleteItem,
  onEditItem,
  isMotion,
  location,
  ...tableProps
}) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk() {
          onDeleteItem(record.id)
        }
      })
    }
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    }, {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastname'
    }, {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      width: 100
    }, {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    }, {
      title: 'Depto',
      dataIndex: 'department',
      key: 'department'
    }, {
      title: 'Manager',
      dataIndex: 'manager',
      key: 'manager'
    }, {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      width: 100
    }, {
      title: 'Operation',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[
          {
            key: '1',
            name: 'Update'
          }, {
            key: '2',
            name: 'Delete'
          }
        ]}/>
      },
      fixed: 'right',
    }
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current
  }

  const getBodyWrapper = body => {
    return isMotion
      ? <AnimTableBody {...getBodyWrapperProps} body={body}/>
      : body
  }

  return (
    <div>
      <Table {...tableProps} className={classnames({
        [styles.table]: true,
        [styles.motion]: isMotion
      })} bordered scroll={{
        x: 1200
      }} columns={columns} simple rowKey={record => record.id} getBodyWrapper={getBodyWrapper}/>
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object
}

export default List
