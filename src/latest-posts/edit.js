import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data'; // to bring data we used the package
import './editor.scss';
import { format, dateI18n, getSettings } from '@wordpress/date';
import { RawHTML } from '@wordpress/element';
export default function Edit({ attributes }) {
	const { numberOfPosts } = attributes;
	const posts = useSelect(
		(select) => {
			return select('core').getEntityRecords('postType', 'post', {
				per_page: numberOfPosts,
				_embed: true,
			});
		},
		[numberOfPosts]
	);

	return (
		<ul {...useBlockProps()}>
			{posts?.map((post) => (
				<li key={post?.id}>
					<h5>
						<a href={post?.link}>{post?.title?.rendered}</a>
					</h5>
					<time dateTime={format('c', post?.date_gmt)}>
						{dateI18n(getSettings().formats.date, post?.date_gmt)}
					</time>

					<RawHTML>{post?.excerpt?.rendered}</RawHTML>

					{post?._embedded?.['wp:featuredmedia']?.length > 0 && (
						<img
							src={
								post._embedded['wp:featuredmedia'][0]
									?.media_details?.sizes?.large?.source_url ??
								post._embedded['wp:featuredmedia'][0]
									?.source_url // fallback if 'large' doesn't exist
							}
							alt={
								post._embedded['wp:featuredmedia'][0]
									?.alt_text || 'Featured image'
							}
						/>
					)}
				</li>
			))}
		</ul>
	);
}
