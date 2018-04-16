import {isDefined, Optional} from "../src/optional";
import {expect} from 'chai';
import 'mocha';

describe('Optional', () => {

    describe('.from', () => {
        it('should throw an error if called with null', () => {
            expect(() => Optional.of(null)).to.throw(TypeError);
        });

        it('should throw an error if called with undefined', () => {
            expect(() => Optional.of(undefined)).to.throw(TypeError);
        });

        it('should accept a non-null value', () => {
            expect(() => Optional.of<string>('string')).not.to.throw();
            expect(Optional.of<string>('string').get()).to.eq('string');
        });
    });

    describe('.ofNullable', () => {
        it('should accept null and defined values', () => {
            expect(() => Optional.ofNullable(null)).not.to.throw();
            expect(() => Optional.ofNullable<string>('string')).not.to.throw();
            expect(Optional.ofNullable<string>('string').get()).to.eq('string');
        });

        it('should throw an error if called with undefined', () => {
            expect(() => Optional.ofNullable(undefined)).to.throw(TypeError);
        });
    });

    describe('.isDefined', () => {
        it('should return true if value is present', () => {
            expect(Optional.of('string').isPresent()).to.eq(true);
        });

        it('should return false if value is not present', () => {
            expect(Optional.ofNullable(null).isPresent()).to.eq(false);
            expect(Optional.empty().isPresent()).to.eq(false);
        });
    });

    describe('.map', () => {
        it('should return an optional with the mapped result', () => {
            expect(Optional.of('string')
                .map<number>(value => value.indexOf('s')).get()).to.be.eq(0);
        });

        it('should not call the mapping function if optional is empty', () => {
            expect(Optional.empty<string>()
                .map<number>(_ => {throw Error('should not be called')})
                .isPresent()).to.eq(false);
        });
    });

    describe('.flatMap', () => {
        it('should return an optional with the mapped result', () => {
            expect(Optional.of('string')
                .flatMap<number>(value => Optional.of(value.indexOf('s'))).get()).to.be.eq(0);
        });

        it('should not call the mapping function if optional is empty', () => {
            expect(Optional.empty<string>()
                .flatMap<number>(_ => {throw Error('should not be called')})
                .isPresent()).to.eq(false);
        });
    });

    describe('.filter', () => {
        it('should not call the filter function if optional is empty', () => {
            expect(Optional.empty<string>()
                .filter(_ => {throw new Error('should not be called')})
                .isPresent()).to.eq(false);
        });

        it('should return an empty optional if the filter returns false', () => {
            expect(Optional.of<string>('string')
                .filter(value => value !== 'string')
                .isPresent()).to.eq(false);
        });

        it('should return an filled optional if the filter returns true', () => {
            expect(Optional.of<string>('string')
                .filter(value => value === 'string').get()).to.eq('string');
        });

    });

    describe('.orElse', () => {
        it('should return the old value if any is present', () => {
            expect(Optional.of<string>('string')
                .orElse('other')).to.eq('string');
        });

        it('should return the overhanded value if optional is empty', () => {
            expect(Optional.empty<string>()
                .orElse('other')).to.eq('other');
        });
    });

    describe('.ifPresent', () => {
        it('should only call the callback if optional is not empty', () => {
            expect(() => Optional.empty<string>()
                .ifPresent(() => {throw new Error('should not be called');})).not.to.throw(Error);
            expect(() => Optional.of<string>('string')
                .ifPresent(() => {throw new Error('must be called')})).to.throw(Error);
        });
    });

    describe('.orElseGet', () => {
        it('should use the supplied value if optional is empty', () => {
            expect(Optional.empty<string>()
                .orElseGet(() => 'string')).to.eq('string');
        });

        it('should not call the supply function if optional has value', () => {
            expect(Optional.of<string>('string')
                .orElseGet(() => {throw new Error('should not be called')})).to.eq('string');
        });
    });

    describe('.orElseThrow', () => {
        it('should throw the given error if optional is empty', () => {
            expect(() => Optional.empty<string>()
                .orElseThrow<RangeError>(() => new TypeError('error'))).to.throw(TypeError);
        });

        it('should not throw the given error if optional has value', () => {
            expect(Optional.of<string>('string')
                .orElseThrow<RangeError>(() => new TypeError('error'))).to.eq('string');
        });
    });

    describe('.getValue', () => {
        it('should throw an error if optional is empty', () => {
            // tslint:disable-next-line:no-inferred-empty-object-type
            expect(() => Optional.empty().get()).to.throw(ReferenceError);
        });
    });

    describe('.ofAnything', () => {
        it('should never throw an error', () => {
            expect(Optional.ofAnything(null).isPresent()).to.eq(false);
            expect(Optional.ofAnything(undefined).isPresent()).to.eq(false);
            expect(Optional.ofAnything<string>('string').get()).to.be.eq('string');
        });
    })

    describe('.toString', () => {
        it('should never throw an error', () => {
            expect(Optional.ofAnything(null).toString()).to.eq('Empty');
            expect(Optional.ofAnything(undefined).toString()).to.eq('Empty');
            expect(Optional.ofAnything<string>('string').toString()).to.be.eq('string');
        });
    })
});


describe('Nullable', () => {
    describe('.isDefined', () => {
        it('should return false if the overhanded value is null or undefined', () => {
            expect(isDefined(null)).to.eq(false);
            expect(isDefined(undefined)).to.eq(false);
        });

        it('should return true if the overhanded value is defined', () => {
            expect(isDefined('string')).not.to.be.undefined;
        });
    });
});
