import { Suspense } from "react"
import SignatureDishes from "./signature-dishes"
import SignatureDishesLoading from "./signature-dishes-loading"

export default function SignatureDishesWrapper() {
  return (
    <Suspense fallback={<SignatureDishesLoading />}>
      <SignatureDishes />
    </Suspense>
  )
}
