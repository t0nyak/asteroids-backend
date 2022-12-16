const { validate } = require('../../../src/utils/validate');

describe('Utils :: Validate', () => {
  it('should validate constraints', () => {
    const constraints = {
      valid: {
        value: '1',
        optional: false,
        validator: {
          isValid: (value) => value === '1',
          errorMessage: '',
        },
      },
      invalid: {
        value: '2',
        optional: false,
        validator: {
          isValid: (value) => value !== '2',
          errorMessage: 'invalid value',
        },
      },
    };
    expect(validate(constraints)).toEqual({
      errors: [{ field: 'invalid', error_msg: 'invalid value' }],
      values: {
        valid: '1',
      },
    });
  });

  it('should fails if missing an non-optional value', () => {
    const constraints = {
      invalid: {
        optional: false,
        validator: {
          errorMessage: 'missing value',
        },
      },
    };
    expect(validate(constraints)).toEqual({
      values: {},
      errors: [{ field: 'invalid', error_msg: 'missing value' }],
    });
  });

  it('should success if no isValid function is provided', () => {
    const constraints = {
      valid: {
        value: '1',
        validator: {
          errorMessage: 'missing value',
        },
      },
    };
    expect(validate(constraints)).toEqual({
      values: {
        valid: '1',
      },
      errors: [],
    });
  });

  it('should ignore if value is missing and optional', () => {
    const constraints = {
      valid: {
        optional: true,
      },
    };
    expect(validate(constraints)).toEqual({
      values: {},
      errors: [],
    });
  });

  it('should throw error if there is any issue within the validation', () => {
    const constraints = {
      valid: {
        value: 1,
      },
    };
    expect(validate(constraints)).toEqual({
      errors: [{ field: '', error_msg: 'error in validation' }],
      values: [],
    });
  });
});
