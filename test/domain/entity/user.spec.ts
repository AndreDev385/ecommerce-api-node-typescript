import { v4 } from 'uuid';
import { User } from '../../../src/domain/entity/user';

describe('Test User Domain Model', () => {
  const id = v4();
  const name = 'Andre';
  const email = 'andre@izarra.com';
  const password = 'Abc123!!';
  const role = 'user';
  const phoneNumber = '4241756083';

  describe('Test validations', () => {
    describe('Name validations', () => {
      test('Should throw an error if name is not a string', () => {
        const numberName: any = 123;

        expect(
          () => new User({ id, name: numberName, email, password, role, phoneNumber })
        ).toThrow(Error('Name should be a string'));
      });

      test('Should return an error if name is missing', () => {
        let noName: any;

        expect(() => new User({ id, name: noName, email, password, role, phoneNumber })).toThrow(
          Error('Name is required')
        );
      });

      test("Should return an error if name's length < 3", () => {
        const badName = 'Lu';

        expect(() => new User({ id, name: badName, email, password, role, phoneNumber })).toThrow(
          Error('Name should have at least 3 characters')
        );
      });
    });

    describe('Email validations', () => {
      test('Should return an error if email is not a string', () => {
        const numberEmail: any = 123;

        expect(
          () => new User({ id, name, email: numberEmail, password, role, phoneNumber })
        ).toThrow(Error('Email should be a string'));
      });

      test('Should return an error if no email', () => {
        let noEmail: any;

        expect(() => new User({ id, name, email: noEmail, password, role, phoneNumber })).toThrow(
          Error('Email is required')
        );
      });

      test('Should return an error if invalid email', () => {
        const invalidEmail = 'andre¡izarra.com';

        expect(
          () => new User({ id, name, email: invalidEmail, password, role, phoneNumber })
        ).toThrow(Error('Invalid email'));
      });
    });

    describe('Password Validations', () => {
      /* test('Should return an error if no password', async () => {
                let noPassword: any;

                await expect(() => new User(name, email, noPassword, role)).rejects.toThrow(
                    Error('')
                );
            });

            test('Should return an error if invalid password', () => {
                let invalidPassword = '123';

                return expect(
                    () => new User(name, email, invalidPassword, role, phoneNumber)
                ).rejects.toThrowError();
            });

            test('Should return an error if password is not a string', () => {
                let numberPassword: any = 123;

                return expect(
                    () => new User(name, email, numberPassword, role, phoneNumber)
                ).rejects.toThrow(Error('Password should be a string'));
            }); */
    });

    describe('Role validations', () => {
      test('Should return an error if no role', () => {
        let noRole: any;

        expect(() => new User({ id, name, email, password, role: noRole, phoneNumber })).toThrow(
          Error('Role is required')
        );
      });

      test('Should return an error if role is not a string', () => {
        const numberRole: any = 123;

        expect(
          () => new User({ id, name, email, password, role: numberRole, phoneNumber })
        ).toThrow(Error('Role should be a string'));
      });

      test('Should return an error if invalid role', () => {
        const invalidRole: any = 'visitor';

        expect(
          () => new User({ id, name, email, password, role: invalidRole, phoneNumber })
        ).toThrow(Error('Invalid role'));
      });
    });

    describe('PhoneNumber Validations', () => {
      test('Should return an error if invalid phone number', () => {
        const invalidPhoneNumber: any = '12a456';

        expect(
          () => new User({ id, name, email, password, role, phoneNumber: invalidPhoneNumber })
        ).toThrow(Error('Invalid phone number'));
      });

      test('Should throw an error if phone nombre is not a string', () => {
        const number: any = 123456;

        expect(() => new User({ id, name, email, password, role, phoneNumber: number })).toThrow(
          Error('Phone number should be a string')
        );
      });
    });
  });

  describe('Test constructor, getters and setters', () => {
    const user = new User({ id, name, email, password, role });

    test('Get Data function', async () => {
      expect(user.getData().name).toEqual(name);
      expect(user.getData().email).toEqual(email);
      expect(user.getData().role).toEqual(role);
      expect(user.getData().phoneNumber).toBeNull();

      const validation = User.validatePassword(password, user.getData().password);
      expect(validation).toBeTruthy();
    });

    test('Setters', () => {
      const newName = 'Jose';
      const newEmail = 'name@example.com';
      const newPassword = 'Jose123!';
      const newRole = 'seller';

      console.log(user.getData(), 'data');

      user.setName(newName);
      expect(user.getData().name).toEqual(newName);

      user.setEmail(newEmail);
      expect(user.getData().email).toEqual(newEmail);

      user.setPassword(newPassword);
      expect(User.validatePassword(newPassword, user.getData().password)).toBeTruthy();

      user.setRole(newRole);
      expect(user.getData().role).toEqual(newRole);

      user.setPhoneNumber(phoneNumber);
      expect(user.getData().phoneNumber).toEqual(phoneNumber);
    });
  });
});
