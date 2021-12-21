export function onImagePickedAction(e, setImagePreview, setCoverImagePreview){
  if(e.target.files != null){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result == 'data:') {
        console.log('Invalid image type!');
        return;
      }
      let imgType = {
        image: () => (setImagePreview(reader.result)),
        coverImage: () => (setCoverImagePreview(reader.result)),
      };
      imgType[e.target.name]();
    };
    reader.readAsDataURL(file);
    return true
  } else {
    return false;
  }
}