import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";

export function FieldIdentity() {
    return (
        <>
        <FieldGroup>
        <Field orientation="horizontal">
            <FieldLabel htmlFor="customerName">Nama</FieldLabel>
            <Input
                id="customerName"
                name="customerName"
                placeholder="Name"
                required>
            </Input>
        </Field>

        <Field>
            <FieldLabel htmlFor="birthDate">Tanggal Lahir</FieldLabel>
            <Input
                id="birthDate"
                name="birthDate"
                type="date"
                placeholder="dd/mm/yyyy"
                required>
            </Input>
        </Field>
        <Field>
            <FieldLabel htmlFor="customerAddress">Alamat</FieldLabel>
            <Input
                id="customerAddress"
                name="customerAddress"
                placeholder="Address"
                required>
            </Input>
        </Field>
        <Field>
            <FieldLabel htmlFor="phoneNumber">Handphone</FieldLabel>
            <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Handphone"
                required
                >
            </Input>
        </Field>
        <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required>
            </Input>
        </Field>
        <Field>
            <FieldLabel htmlFor="birthDate">Pekerjaan</FieldLabel>
            <Input
                id="occupation"
                name="occupation"
                placeholder="Occupation">
            </Input>
        </Field>
        </FieldGroup>
    </>
)}