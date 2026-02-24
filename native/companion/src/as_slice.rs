pub trait AsSlice {
    type Element;

    fn as_slice(&self) -> &[Self::Element];
}

impl<T> AsSlice for [T] {
    type Element = T;

    fn as_slice(&self) -> &[T] {
        self
    }
}
