import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Modal,
  Cascader,
  DatePicker
} from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="Title" hasFeedback {...formItemLayout}>
          {getFieldDecorator('title', {initialValue: item.title})(<Input/>)}
        </FormItem>
        <FormItem label="First Name" hasFeedback {...formItemLayout}>
          {getFieldDecorator('firstName', {
            initialValue: item.firstName,
            rules: [
              {
                required: true
              }
            ]
          })(<Input/>)}
        </FormItem>
        <FormItem label="Last Name" hasFeedback {...formItemLayout}>
          {getFieldDecorator('lastName', {
            initialValue: item.lastName,
            rules: [
              {
                required: true
              }
            ]
          })(<Input/>)}
        </FormItem>
        <FormItem label="User Name" hasFeedback {...formItemLayout}>
          {getFieldDecorator('userName', {
            initialValue: item.userName,
            rules: [
              {
                required: true
              }
            ]
          })(<Input/>)}
        </FormItem>
        <FormItem label="Phone" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                required: true,
                pattern: /^\d{9}$/,
                message: 'The input is not valid phone!'
              }
            ]
          })(<Input/>)}
        </FormItem>
        <FormItem label="Department" hasFeedback {...formItemLayout}>
          {getFieldDecorator('department', {initialValue: item.department})(<Input/>)}
        </FormItem>
        <FormItem label="Manager" hasFeedback {...formItemLayout}>
          {getFieldDecorator('manager', {initialValue: item.manager})(<Input/>)}
        </FormItem>
        {/* <FormItem label="Birth Date" hasFeedback {...formItemLayout}>
          {getFieldDecorator('birth', {initialValue: moment(item.birth, 'DD/MM/YYYY')})(<DatePicker/>)}
        </FormItem> */}
        <FormItem label="Salary" hasFeedback {...formItemLayout}>
          {getFieldDecorator('salary', {
            initialValue: item.salary,
            rules: [
              {
                required: true
              }
            ]
          })(<InputNumber parser={value => value.replace(/\$\s?|(,*)/g, '')}/>)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func
}

export default Form.create()(modal)
