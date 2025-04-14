import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data'; // to bring data we used the package
import './editor.scss';
import { format, dateI18n, getSettings } from '@wordpress/date';
import { RawHTML } from '@wordpress/element';
import { PanelBody, ToggleControl, QueryControls } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
export default function Edit({ attributes, setAttributes }) {
	const { numberOfPosts, displayImage, order, orderBy, categories } =
		attributes;
	const catIDs = categories?.map((cat) => cat.id);
	const posts = useSelect(
		(select) => {
			return select('core').getEntityRecords('postType', 'post', {
				per_page: numberOfPosts,
				_embed: true,
				order,
				orderby: orderBy,
				categories: catIDs,
			});
		},
		[numberOfPosts, order, orderBy, catIDs]
	);

	const allCats = useSelect((select) => {
		return select('core').getEntityRecords('taxonomy', 'category', {
			per_page: -1,
		});
	}, []);

	const HandleDisplayFeatureImage = (value) => {
		setAttributes({
			displayImage: value,
		});
	};

	const onNumberOfItemsChange = (value) => {
		setAttributes({
			numberOfPosts: value,
		});
	};
	const handleOrder = (value) => {
		setAttributes({
			order: value,
		});
	};

	const handleOrderBy = (value) => {
		setAttributes({
			orderBy: value,
		});
	};
	const catSuggestions = {};
	if (allCats) {
		for (let i = 0; i < allCats.length; i++) {
			const cat = allCats[i];
			catSuggestions[cat.name] = cat; // key is name of the cat object and value is the cat object
		}
	}

	const handleCategoryChange = (values) => {
		const hasNoSuggestion = values.some(
			(value) => typeof value === 'string' && !catSuggestions[value] //.some() is an array method that returns true if at least one item in the array meets the condition.
		);

		if (hasNoSuggestion) return;
		const updatedCats = values.map((value) => {
			return typeof value === 'string' ? catSuggestions[value] : value;
		});

		setAttributes({
			categories: updatedCats,
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<ToggleControl
						label={__('Display Featured Image', 'latest-posts')}
						checked={displayImage}
						onChange={HandleDisplayFeatureImage}
					/>

					<QueryControls
						numberOfItems={numberOfPosts}
						onNumberOfItemsChange={onNumberOfItemsChange}
						maxItems={10}
						minItems={2}
						orderBy={orderBy}
						onOrderByChange={handleOrderBy}
						order={order}
						onOrderChange={handleOrder}
						categoriesList={allCats}
						categorySuggestions={catSuggestions}
						selectedCategories={categories}
						selectedCategoryId={1}
						onCategoryChange={handleCategoryChange}
					/>
				</PanelBody>
			</InspectorControls>
			<ul {...useBlockProps()}>
				{posts?.map((post) => (
					<li key={post?.id}>
						{post?._embedded?.['wp:featuredmedia']?.length > 0 &&
							displayImage && (
								<img
									src={
										post._embedded['wp:featuredmedia'][0]
											?.media_details?.sizes?.large
											?.source_url ??
										post._embedded['wp:featuredmedia'][0]
											?.source_url // fallback if 'large' doesn't exist
									}
									alt={
										post._embedded['wp:featuredmedia'][0]
											?.alt_text || 'Featured image'
									}
								/>
							)}
						<h5>
							<a href={post?.link}>{post?.title?.rendered}</a>
						</h5>
						<time dateTime={format('c', post?.date_gmt)}>
							{dateI18n(
								getSettings().formats.date,
								post?.date_gmt
							)}
						</time>

						<RawHTML>{post?.excerpt?.rendered}</RawHTML>
					</li>
				))}
			</ul>
		</>
	);
}
