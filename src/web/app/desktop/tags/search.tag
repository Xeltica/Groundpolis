<mk-search>
	<header>
		<h1>{ query }</h1>
	</header>
	<mk-search-posts ref="posts" query={ query }></mk-search-posts>
	<style>
		:scope
			display block
			padding-bottom 32px

			> header
				width 100%
				max-width 600px
				margin 0 auto
				color #555

			> mk-search-posts
				max-width 600px
				margin 0 auto
				border solid 1px rgba(0, 0, 0, 0.075)
				border-radius 6px
				overflow hidden

	</style>
	<script>
		@query = @opts.query

		@on \mount ~>
			@refs.posts.on \loaded ~>
				@trigger \loaded
	</script>
</mk-search>
