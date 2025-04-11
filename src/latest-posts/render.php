<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Set up the query arguments
$args = array(
    'posts_per_page' => $attributes['numberOfPosts'],
    'post_status'    => 'publish',
);

// Get the recent posts
$recent_posts = get_posts( $args );
?>

<ul <?php echo get_block_wrapper_attributes(); ?>>
    <!-- get_block_wrapper_attributes() works like a class -->

    <?php foreach ( $recent_posts as $post ) : ?>
    <li>
        <h5>
            <a href="<?php echo esc_url( get_permalink( $post ) ); ?>">
                <?php echo esc_html( get_the_title( $post ) ); ?>
            </a>
        </h5>

        <?php if ( ! empty( $attributes['displayImage'] ) && has_post_thumbnail( $post ) ) : ?>
        <div class="post-thumbnail">
            <?php echo get_the_post_thumbnail( $post, 'thumbnail' ); ?>
        </div>
        <?php endif; ?>
        <p>
            <?php echo esc_html( get_the_excerpt( $post ) ); ?>
        </p>
    </li>
    <?php endforeach; ?>

</ul>