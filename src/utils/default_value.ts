import ThumbnailBlog from '../../assets/thumbnail_blog.webp'

const SetThumbnailBlog = (value?: string| null) => {
    if (value==null || value == ""){
        return ThumbnailBlog as string
    }
    return value as string
}