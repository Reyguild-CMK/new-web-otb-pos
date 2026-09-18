// Components - label & field input
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";

export function FieldIdentity({ formData, setFormData }: { formData: any, setFormData: any }) {
    return (
        <>
        <FieldGroup>
        <Field orientation="horizontal">
            <FieldLabel htmlFor="customerName">Nama</FieldLabel>
            <Input
                id="customerName"
                name="customerName"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                disabled>
            </Input>
        </Field>

        <Field>
            <FieldLabel htmlFor="birthDate">Tanggal Lahir</FieldLabel>
            <Input
                id="birthDate"
                name="birthDate"
                type="date"
                placeholder="dd/mm/yyyy"
                value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                required
                disabled>
            </Input>
        </Field>
        <Field>
            <FieldLabel htmlFor="customerAddress">Alamat</FieldLabel>
            <Input
                id="customerAddress"
                name="customerAddress"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
                disabled>
            </Input>
        </Field>
        <Field>
            <FieldLabel htmlFor="phoneNumber">Handphone</FieldLabel>
            <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Handphone"
                value={formData.handphone}
                onChange={(e) => setFormData({...formData, handphone: e.target.value})}
                required
                disabled
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
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                disabled>
            </Input>
        </Field>
        <Field>
            <FieldLabel htmlFor="occupation">Pekerjaan</FieldLabel>
            <Input
                id="occupation"
                name="occupation"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                >
            </Input>
        </Field>
        </FieldGroup>
    </>
)}