import {isDefined, Optional} from "../src/optional";

describe('Optional', () => {

  describe('.from', () => {
    it('should throw an error if called with null', () => {
      expect(() => Optional.of(null)).toThrowError();
    });

    it('should throw an error if called with undefined', () => {
      expect(() => Optional.of(undefined)).toThrowError();
    });

    it('should accept a non-null value', () => {
      expect(() => Optional.of<string>('str')).not.toThrowError();
      expect(Optional.of<string>('str').get()).toEqual('str');
    });
  });

  describe('.ofNullable', () => {
    it('should accept null and defined values', () => {
      expect(() => Optional.ofNullable(null)).not.toThrowError();
      expect(() => Optional.ofNullable<string>('str')).not.toThrowError();
      expect(Optional.ofNullable<string>('str').get()).toEqual('str');
    });

    it('should throw an error if called with undefined', () => {
      expect(() => Optional.ofNullable(undefined)).toThrowError();
    });
  });

  describe('.isDefined', () => {
    it('should return true if value is present', () => {
      expect(Optional.of('str').isPresent()).toBeTruthy();
    });

    it('should return false if value is not present', () => {
      expect(Optional.ofNullable(null).isPresent()).toBeFalsy()
      expect(Optional.empty().isPresent()).toBeFalsy()
    });
  });

  describe('.map', () => {
    it('should return an optional with the mapped result', () => {
      expect(Optional.of('str').map<number>(value => value.indexOf('s')).get()).toBe(0);
    });

    it('should not call the mapping function if optional is empty', () => {
      expect(Optional.empty<string>().map<number>(_ => {
        throw Error('should not be called')
      }).isPresent()).toBeFalsy()
    });
  });

  describe('.flatMap', () => {
    it('should return an optional with the mapped result', () => {
      expect(Optional.of('str').flatMap<number>(value => Optional.of(value.indexOf('s'))).get()).toBe(0);
    });

    it('should not call the mapping function if optional is empty', () => {
      expect(Optional.empty<string>().flatMap<number>(_ => {
        throw Error('should not be called')
      }).isPresent()).toBeFalsy();
    });
  });

  describe('.filter', () => {
    it('should not call the filter function if optional is empty', () => {
      expect(Optional.empty<string>().filter(_ => {
        throw new Error('should not be called')
      }).isPresent()).toBeFalsy();
    });

    it('should return an empty optional if the filter returns false', () => {
      expect(Optional.of<string>('str').filter(value => value !== 'str').isPresent()).toBeFalsy();
    });

    it('should return an filled optional if the filter returns true', () => {
      expect(Optional.of<string>('str').filter(value => value === 'str').get()).toEqual('str');
    });

  });

  describe('.orElse', () => {
    it('should return the old value if any is present', () => {
      expect(Optional.of<string>('str').orElse('other')).toEqual('str');
    });

    it('should return the overhanded value if optional is empty', () => {
      expect(Optional.empty<string>().orElse('other')).toEqual('other');
    });
  });

  describe('.ifPresent', () => {
    it('should only call the callback if optional is not empty', () => {
      expect(() => Optional.empty<string>().ifPresent(() => {
        throw new Error('should not be called');
      })).not.toThrowError();
      expect(() => Optional.of<string>('str').ifPresent(() => {
        throw new Error('must be called')
      })).toThrowError();
    });
  });

  describe('.orElseGet', () => {
    it('should use the supplied value if optional is empty', () => {
      expect(Optional.empty<string>().orElseGet(() => 'str')).toEqual('str');
    });

    it('should not call the supply function if optional has value', () => {
      expect(Optional.of<string>('str').orElseGet(() => {
        throw new Error('should not be called')
      })).toEqual('str');
    });
  });

  describe('.orElseThrow', () => {
    it('should throw the given error if optional is empty', () => {
      expect(() => Optional.empty<string>().orElseThrow<RangeError>(() => new TypeError('error'))).toThrowError();
    });

    it('should not throw the given error if optional has value', () => {
      expect(Optional.of<string>('str').orElseThrow<RangeError>(() => new TypeError('error'))).toEqual('str');
    });
  });

  describe('.getValue', () => {
    it('should throw an error if optional is empty', () => {
      // tslint:disable-next-line:no-inferred-empty-object-type
      expect(() => Optional.empty().get()).toThrowError();
    });
  });

  describe('.ofAnything', () => {
    it('should never throw an error', () => {
      expect(Optional.ofAnything(null).isPresent()).toBeFalsy();
      expect(Optional.ofAnything(undefined).isPresent()).toBeFalsy();
      expect(Optional.ofAnything<string>('str').get()).toBe('str');
    });
  })
});


describe('Nullable', () => {
  describe('.isDefined', () => {
    it('should return false if the overhanded value is null or undefined', () => {
      expect(isDefined(null)).toBeFalsy();
      expect(isDefined(undefined)).toBeFalsy();
    });

    it('should return true if the overhanded value is defined', () => {
      expect(isDefined('str')).toBeDefined();
    });
  });
});
