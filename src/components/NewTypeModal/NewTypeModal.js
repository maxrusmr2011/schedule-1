import {Form, Input, message, Modal, Tag} from 'antd';
import React, {useState} from 'react';
import {BlockPicker} from 'react-color';
import reactComponentDebounce from 'react-component-debounce';
import {connect} from 'react-redux';
import {addNewType, hideTypeModalView} from '../../actions';
import './new-type-modal.css';

const InputDeb = reactComponentDebounce(150, 200)(Input);

const connector = connect(
  state => ({
    currentTypes: state.styles,
    view: state.app.isShowTypeModal,
  }),
  dispatch => ({
    addNewType: value => dispatch(addNewType(value)),
    hideWindow: () => dispatch(hideTypeModalView()),
  })
);
const NewTypeModal = ({currentTypes, addNewType, view, hideWindow}) => {
  const [form] = Form.useForm();
  const initialType = {
    title: 'title',
    value: 'title',
    background: '#d9e3f0',
    color: '#555555',
  };
  const [type, setType] = useState(initialType);
  const [backPicker, setBackPicker] = useState(false);
  const [textPicker, setTextPicker] = useState(false);

  const updateTitle = val => {
    const current = val;
    setType(prev => {
      return {
        ...prev,
        title: current,
        value: current.trim().toLowerCase(),
      };
    });
  };
  const updateBackground = obj => {
    const current = obj.hex;
    setType(prev => {
      return {
        ...prev,
        background: current,
      };
    });
  };
  const updateText = obj => {
    const current = obj.hex;
    setType(prev => {
      return {
        ...prev,
        color: current,
      };
    });
  };
  const saveNewType = () => {
    if (type.value.trim() === '') {
      message.error('Title must not be empty');
    } else if (!currentTypes.find(item => item.value === type.value)) {
      addNewType(type);
      localStorage.setItem('eventTypeStyles', JSON.stringify([...currentTypes, type]));
      message.success('Success');
      hideWindow();
      setType(initialType);
      form.resetFields();
    } else {
      message.error('This type already been decleared');
    }
  };
  const onCancel = () => {
    form.resetFields();
    setType(initialType);
    hideWindow();
  };

  return (
    <Modal zIndex={1002} title="Add new type" visible={view} onOk={saveNewType} onCancel={onCancel}>
      <Tag style={{color: type.color, background: type.background}} className="tag-example">
        {type.title}
      </Tag>
      <Form form={form}>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              type: 'string',
              max: 20,
              message: 'Required field. Max length of string 20 characters.',
            },
          ]}
        >
          <InputDeb maxLength={20} placeholder="title" onChange={updateTitle} />
        </Form.Item>
      </Form>

      <div className="color-type-container">
        <div className="background-color-type-container">
          <div
            className="background-color-type"
            onMouseEnter={() => setBackPicker(true)}
            onMouseLeave={() => setBackPicker(false)}
            style={{background: type.background}}
          >
            <span className="background-color-type-content" style={{color: type.color}}>
              Background
            </span>
            <div onMouseLeave={() => setBackPicker(false)}>
              <BlockPicker
                onChange={updateBackground}
                color={type.background}
                className={`background-color-type-picker ${backPicker ? '' : 'hidden'}`}
              />
            </div>
          </div>
        </div>
        <div className="text-color-type-container">
          <div
            className="text-color-type"
            onMouseEnter={() => setTextPicker(true)}
            onMouseLeave={() => setTextPicker(false)}
            style={{background: type.background}}
          >
            <span className="text-color-type-content" style={{color: type.color}}>
              Text
            </span>
            <div onMouseLeave={() => setTextPicker(false)}>
              <BlockPicker
                onChange={updateText}
                color={type.color}
                className={`text-color-type-picker ${textPicker ? '' : 'hidden'}`}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default connector(NewTypeModal);
