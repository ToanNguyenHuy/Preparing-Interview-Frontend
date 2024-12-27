export default function Input({name, placeholder, register, errors, type, validationSchema, className}) {
    return (
        <>
            <input
                id={name}
                name={name}
                type={type}
                {...register(name, validationSchema)}
                placeholder={placeholder}
                className={"w-full border-[1px] border-[#cfd8dc] rounded-[3px] color-[#546e7a] text-base font-light py-[8px] px-[13px] mb-3"}
            />
            {errors && errors[name]?.type === "required" && (
                <span className="error">{errors[name]?.message}</span>
            )}
            {errors && errors[name]?.type === "minLength" && (
                <span className="error">{errors[name]?.message}</span>
            )}
        </>
    )
}
;