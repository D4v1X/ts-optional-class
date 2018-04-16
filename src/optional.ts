/* tslint:disable:function-name no-reserved-keywords no-typeof-undefined curly */
/**
 * A container object which may or may not contain a non-null value.
 * If a value is present, {@code isPresent()} will return {@code true} and
 * {@code get()} will return the value.
 *
 * <p>Additional methods that depend on the presence or absence of a contained
 * value are provided, such as {@link #orElse(Object) orElse()}
 * (return a default value if value not present) and
 * {@link #ifPresent(function) ifPresent()} (execute a block
 * of code if the value is present).
 */
export class Optional<T> {

    private readonly value: T | null = null;

    private constructor(value: T | null) {
        this.value = value;
    }

    /**
     * Returns an empty {@code Optional} instance.  No value is present for this
     * Optional.
     *
     * Note: <T> Type of the non-existent value
     * @return an empty {@code Optional}
     */
    public static empty<T>(): Optional<T> {
        return new Optional<T>(null);
    }

    /**
     * Returns an {@code Optional} with the specified present non-null value.
     *
     * Note:  <T> the class of the value
     * @param value the value to be present, which must be non-null
     * @return an {@code Optional} with the value present
     * @throws TypeError If the overhanded value is null or undefined, a TypeError will be thrown.
     */
    public static of<T>(value: T): Optional<T> {
        if (!isDefined(value))
            throw new TypeError('value must be defined');
        else
            return new Optional<T>(value);
    }

    /**
     * Returns an {@code Optional} describing the specified value, if non-null,
     * otherwise returns an empty {@code Optional}.
     *
     * Note: <T> the class of the value
     * @param value the possibly-null value to describe
     * @return an {@code Optional} with a present value if the specified value
     * is non-null, otherwise an empty {@code Optional}
     * @throws TypeError If the overhanded value is undefined, a TypeError will be thrown.
     */
    public static ofNullable<T>(value: T | null): Optional<T> {
        // tslint:disable-next-line:strict-type-predicates
        if (typeof value === 'undefined')
            throw new TypeError('value cannot be undefined');

        return new Optional<T>(value);
    }

    /**
     * Returns an {@code Optional} describing the specified value, if non-null,
     * otherwise returns an empty {@code Optional}.
     *
     * Note: <T> the class of the value
     * @param value the possibly-null and undefined value to describe
     * @return an {@code Optional} with a present value if the specified value
     * is non-null, otherwise an empty {@code Optional}
     *
     * Never throws an exception.
     */
    public static ofAnything<T>(value: T | null | undefined): Optional<T> {
        if (value == null || typeof value === 'undefined')
            return Optional.empty<T>();
        else
            return new Optional<T>(value);
    }

    /**
     * If a value is present in this {@code Optional}, returns the value,
     * otherwise throws {@code ReferenceError}.
     *
     * @return The encapsulated value that is neither null nor undefined.
     * @throws ReferenceError if there is no value present
     *
     * @see Optional#isPresent()
     */
    public get(): T {
        if (this.value === null)
            throw new ReferenceError('value is not defined');
        else
            return this.value;
    }

    /**
     * Return {@code true} if there is a value present, otherwise {@code false}.
     *
     * @return true if there is a value present, otherwise false
     */
    public isPresent(): boolean {
        return this.value !== null;
    }

    /**
     * If a value is present, invoke the overhanded function with the value,
     * otherwise do nothing.
     *
     * @param func function to be executed if a value is present
     */
    public ifPresent(func: (value: T) => void): void {
        if (this.value !== null)
            func(this.value);
    }

    /**
     * If a value is present, and the value matches the given predicate,
     * return an {@code Optional} describing the value, otherwise return an
     * empty {@code Optional}.
     *
     * @param predicate a predicate to apply to the value, if present
     * @return an {@code Optional} describing the value of this {@code Optional}
     * if a value is present and the value matches the given predicate,
     * otherwise an empty {@code Optional}
     */
    public filter(predicate: (value: T) => boolean): Optional<T> {
        if (this.value === null)
            return Optional.empty<T>();
        else
            return new Optional(predicate(this.value) ? this.value : null);
    }

    /**
     * If a value is present, apply the provided mapping function to it,
     * and if the result is non-null, return an {@code Optional} describing the
     * result.  Otherwise return an empty {@code Optional}.
     *
     * Note: <U> The type of the result of the mapping function
     * @param mapper a mapping function to apply to the value, if present
     * @return an {@code Optional} describing the result of applying a mapping
     * function to the value of this {@code Optional}, if a value is present,
     * otherwise an empty {@code Optional}
     */
    public map<U>(mapper: (value: T) => U): Optional<U> {
        if (this.value === null)
            return Optional.empty<U>();
        else
            return new Optional<U>(mapper(this.value));
    }

    /**
     * If a value is present, apply the provided {@code Optional}-bearing
     * mapping function to it, return that result, otherwise return an empty
     * {@code Optional}.  This method is similar to {@link #map(Function)},
     * but the provided mapper is one whose result is already an {@code Optional},
     * and if invoked, {@code flatMap} does not wrap it with an additional
     * {@code Optional}.
     *
     * Note: <U> The type parameter to the {@code Optional} returned by
     * @param mapper a mapping function to apply to the value, if present the mapping function
     * @return the result of applying an {@code Optional}-bearing mapping
     * function to the value of this {@code Optional}, if a value is present,
     * otherwise an empty {@code Optional}
     */
    public flatMap<U>(mapper: (value: T) => Optional<U>): Optional<U> {
        if (this.value === null)
            return Optional.empty<U>();
        else
            return mapper(this.value);
    }

    /**
     * Return the value if present, otherwise return {@code other}.
     *
     * @param other the value to be returned if there is no value present, maybe null
     * @return the value, if present, otherwise {@code other}
     */
    public orElse(other: T): T {
        if (this.value === null)
            return other;
        else
            return this.value;
    }

    /**
     * Return the value if present, otherwise invoke supplier and return
     * the result of that invocation.
     *
     * @param supplier a whose result is returned if no value is present
     * @return the value if present otherwise the result of supplier
     */
    public orElseGet(supplier: () => T): T {
        if (this.value === null)
            return supplier();
        else
            return this.value;
    }

    /**
     * Return the contained value, if present, otherwise throw an Error
     * to be created by the provided supplier.
     *
     * Note: <X> Type of the exception to be thrown
     * @param errorSupplier The supplier which will return the exception to be thrown
     * @return the present value
     * @throws X if there is no value present
     */
    public orElseThrow<X extends Error>(errorSupplier: () => X): T {
        if (this.value === null)
            throw errorSupplier();
        else
            return this.value;
    }

    /**
     * Returns the string representation of the contained object if any.
     * Otherwise returns 'empty'.
     */
    public toString(): string {
        if (this.value === null)
            return 'empty';
        else
            return this.value.toString();

    }

}

/**
 * Returns true if the given value is neither null nor undefined.
 */
// tslint:disable-next-line:no-any
export function isDefined(value: any): boolean {
    return typeof value !== 'undefined' && value !== null;
}
