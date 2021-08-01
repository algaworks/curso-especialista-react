import {
  Col,
  Form,
  Input,
  Row,
  Avatar,
  DatePicker,
  Divider,
  Select,
  Tabs,
  Upload,
  Button,
  notification,
} from 'antd';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  FileService,
  User,
  UserService,
} from 'danielbonifacio-sdk';
import { UserOutlined } from '@ant-design/icons';
import ImageCrop from 'antd-img-crop';
import CustomError from 'danielbonifacio-sdk/dist/CustomError';
import MaskedInput from 'antd-mask-input';

const { TabPane } = Tabs;

export default function UserForm() {
  const [form] = Form.useForm<User.Input>();

  const [avatar, setAvatar] = useState('');
  const [activeTab, setActiveTab] = useState<
    'personal' | 'bankAccount'
  >('personal');

  const handleAvatarUpload = useCallback(
    async (file: File) => {
      const avatarSource = await FileService.upload(file);
      setAvatar(avatarSource);
    },
    []
  );

  useEffect(() => {
    form.setFieldsValue({
      avatarUrl: avatar || undefined,
    });
  }, [avatar]);

  return (
    <Form
      form={form}
      autoComplete={'off'}
      layout={'vertical'}
      onFinishFailed={(fields) => {
        let bankAccountErrors = 0;
        let personalDataErrors = 0;

        fields.errorFields.forEach(({ name }) => {
          if (name.includes('bankAccount'))
            bankAccountErrors++;
          if (
            name.includes('location') ||
            name.includes('skills') ||
            name.includes('phone') ||
            name.includes('taxpayerId') ||
            name.includes('pricePerWord')
          )
            personalDataErrors++;
        });

        if (bankAccountErrors > personalDataErrors) {
          setActiveTab('bankAccount');
        }
        if (personalDataErrors > bankAccountErrors) {
          setActiveTab('personal');
        }
      }}
      onFinish={async (user: User.Input) => {
        const userDTO: User.Input = {
          ...user,
          phone: user.phone.replace(/\D/g, ''),
          taxpayerId: user.taxpayerId.replace(/\D/g, ''),
        };

        try {
          await UserService.insertNewUser(userDTO);
          notification.success({
            message: 'Sucesso',
            description: 'usuário criado com sucesso',
          });
        } catch (error) {
          console.log(error);
          if (error instanceof CustomError) {
            if (error.data?.objects) {
              form.setFields(
                error.data.objects.map((error) => {
                  return {
                    name: error.name
                      ?.split(/(\.|\[|\])/gi)
                      .filter(
                        (str) =>
                          str !== '.' &&
                          str !== '[' &&
                          str !== ']' &&
                          str !== ''
                      )
                      .map((str) =>
                        isNaN(Number(str))
                          ? str
                          : Number(str)
                      ) as string[],
                    errors: [error.userMessage],
                  };
                })
              );
            } else {
              notification.error({
                message: error.message,
                description:
                  error.data?.detail === 'Network Error'
                    ? 'Erro na rede'
                    : error.data?.detail,
              });
            }
          } else {
            notification.error({
              message: 'Houve um erro',
            });
          }
        }
      }}
    >
      <Row gutter={24} align={'middle'}>
        <Col lg={4}>
          <ImageCrop rotate shape={'round'} grid aspect={1}>
            <Upload
              maxCount={1}
              onRemove={() => {
                setAvatar('');
              }}
              beforeUpload={(file) => {
                handleAvatarUpload(file);
                return false;
              }}
            >
              <Avatar
                style={{ cursor: 'pointer' }}
                icon={<UserOutlined />}
                src={avatar}
                size={128}
              />
            </Upload>
          </ImageCrop>
          <Form.Item name={'avatarUrl'} hidden>
            <Input hidden />
          </Form.Item>
        </Col>
        <Col lg={8}>
          <Form.Item
            label={'Nome'}
            name={'name'}
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
              {
                max: 255,
                message: `O nome não pode ter mais de 255 caracteres`,
              },
            ]}
          >
            <Input placeholder={'E.g.: João Silva'} />
          </Form.Item>
          <Form.Item
            label={'Data de nascimento'}
            name={'birthdate'}
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format={'DD/MM/YYYY'}
            />
          </Form.Item>
        </Col>
        <Col lg={12}>
          <Form.Item
            label={'Bio'}
            name={'bio'}
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
              {
                max: 255,
                message: `A biografia não pode ter mais de 255 caracteres`,
              },
              {
                min: 10,
                message: `A biografia não pode ter menos de 10 caracteres`,
              },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Divider />
        </Col>
        <Col lg={12}>
          <Form.Item
            label={'Perfil'}
            name={'role'}
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
              {
                type: 'enum',
                enum: ['EDITOR', 'ASSISTANT', 'MANAGER'],
                message: `O Perfil precisar ser editor, assitente ou gerente`,
              },
            ]}
          >
            <Select placeholder={'Selecione um perfil'}>
              <Select.Option value={'EDITOR'}>
                Editor
              </Select.Option>
              <Select.Option value={'ASSISTANT'}>
                Assistente
              </Select.Option>
              <Select.Option value={'MANAGER'}>
                Gerente
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={12}>
          <Form.Item
            label={'Email'}
            name={'email'}
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
              {
                max: 255,
                message: `O email não pode ter mais de 255 caracteres`,
              },
            ]}
          >
            <Input
              type='email'
              placeholder={'E.g.: contato@joao.silva'}
            />
          </Form.Item>
        </Col>
        <Col lg={24}>
          <Divider />
        </Col>

        <Col lg={24}>
          <Tabs
            defaultActiveKey={'personal'}
            activeKey={activeTab}
            onChange={(tab) =>
              setActiveTab(
                tab as 'personal' | 'bankAccount'
              )
            }
          >
            <TabPane
              key={'personal'}
              tab={'Dados pessoais'}
            >
              <Row gutter={24}>
                <Col lg={8}>
                  <Form.Item
                    label={'País'}
                    name={['location', 'country']}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                      {
                        max: 50,
                        message: `O país não pode ter mais de 50 caracteres`,
                      },
                    ]}
                  >
                    <Input placeholder={'E.g.: Brasil'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Estado'}
                    name={['location', 'state']}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                      {
                        max: 50,
                        message: `O estado não pode ter mais de 50 caracteres`,
                      },
                    ]}
                  >
                    <Input
                      placeholder={'E.g.: Espírito Santo'}
                    />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Cidade'}
                    name={['location', 'city']}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                      {
                        max: 255,
                        message: `A cidade não pode ter mais de 255 caracteres`,
                      },
                    ]}
                  >
                    <Input placeholder={'E.g.: Vitória'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Telefone'}
                    name={'phone'}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                      {
                        max: 20,
                        message: `O telefone não pode ter mais de 20 caracteres`,
                      },
                    ]}
                  >
                    <MaskedInput
                      mask='(11) 11111-1111'
                      placeholder={'(27) 99999-0000'}
                    />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'CPF'}
                    name={'taxpayerId'}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                      {
                        max: 14,
                        message: `O CPF não pode ter mais de 14 caracteres`,
                      },
                    ]}
                  >
                    <MaskedInput
                      mask='111.111.111-11'
                      placeholder={'111.222.333-44'}
                    />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Preço por palavra'}
                    name={'pricePerWord'}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                    ]}
                  >
                    <Input placeholder={'0'} />
                  </Form.Item>
                </Col>
                {[1, 2, 3].map((_, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Col lg={6}>
                        <Form.Item
                          label={'Habilidade'}
                          name={['skills', index, 'name']}
                          rules={[
                            {
                              required: true,
                              message:
                                'O campo é obrigatório',
                            },
                            {
                              max: 50,
                              message: `A habilidade não pode ter mais de 50 caracteres`,
                            },
                          ]}
                        >
                          <Input
                            placeholder={'E.g.: JavaScript'}
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={2}>
                        <Form.Item
                          label={'%'}
                          name={[
                            'skills',
                            index,
                            'percentage',
                          ]}
                          rules={[
                            {
                              required: true,
                              message: '',
                            },
                            {
                              async validator(
                                field,
                                value
                              ) {
                                if (isNaN(Number(value)))
                                  throw 'Apenas números';
                                if (Number(value) > 100)
                                  throw 'Máximo é 100';
                                if (Number(value) < 0)
                                  throw 'Mínimo é 0';
                              },
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </React.Fragment>
                  );
                })}
              </Row>
            </TabPane>
            <TabPane
              key={'bankAccount'}
              tab={'Dados bancários'}
              forceRender
            >
              <Row gutter={24}>
                <Col lg={8}>
                  <Form.Item
                    label={'Instituição'}
                    name={['bankAccount', 'bankCode']}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                      {
                        max: 3,
                        message: `A instituição precisa ter 3 caracteres`,
                      },
                      {
                        min: 3,
                        message: `A instituição precisa ter 3 caracteres`,
                      },
                    ]}
                  >
                    <Input placeholder={'260'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Agência'}
                    name={['bankAccount', 'agency']}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                      {
                        max: 10,
                        message: `A agência precisa ter no máximo 10 caracteres`,
                      },
                      {
                        min: 1,
                        message: `A agência precisa ter no mínimo 1 caractere`,
                      },
                    ]}
                  >
                    <Input placeholder={'0001'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Conta sem dígito'}
                    name={['bankAccount', 'number']}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                    ]}
                  >
                    <Input placeholder={'12345'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Dígito'}
                    name={['bankAccount', 'digit']}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                      {
                        max: 1,
                        message: `O dígito precisa ser único`,
                      },
                    ]}
                  >
                    <Input placeholder={'1'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Tipo de conta'}
                    name={['bankAccount', 'type']}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                    ]}
                  >
                    <Select
                      placeholder={
                        'Selecione o tipo de conta'
                      }
                    >
                      <Select.Option value={'SAVING'}>
                        Conta poupança
                      </Select.Option>
                      <Select.Option value={'CHECKING'}>
                        Conta corrente
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Col>
        <Col lg={24}>
          <Row justify={'end'}>
            <Button type={'primary'} htmlType={'submit'}>
              Cadastrar usuário
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  );
}
