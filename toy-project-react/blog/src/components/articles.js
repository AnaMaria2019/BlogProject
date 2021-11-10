import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import axiosInstance from '../axios';


const useStyles = makeStyles((theme) => ({
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	articleTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	articleText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

const Articles = (props) => {
    const approveOrRejectArticleClick = (article_id, status) => {
		const username = localStorage.getItem('username');

		axiosInstance.put(`article-approval?id=${article_id}&username=${username}`, {
			status: status,
		}).then((res) => {
			window.location.reload(false);
			console.log(res);
			console.log(res.data);
		});
    }
	const { articles } = props;
    const classes = useStyles();
	
	if (articles == null) {
		return <p>Sorry, only editors have access to this page.</p>
	} else if (articles.length === 0) {
		return <p>There are no articles.</p>;
	}

	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{articles.map((article) => {
						return (
							<Grid item key={article.id} xs={12} md={12}>
								<Card className={classes.card}>
									<CardContent className={classes.cardContent}>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.articleTitle}
										>
											<b>{article.title.substr(0, 50)}</b> by <b>{article.written_by.name}</b>
										</Typography>
									</CardContent>
                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => approveOrRejectArticleClick(article.id, 'published')}
                                        >
                                            Approve
                                        </Button>
                                        <Button
											variant="outlined"
											size="small"
											onClick={() => approveOrRejectArticleClick(article.id, 'rejected')}
										>
											Reject
										</Button>
                                    </CardActions>

									<CardContent>
										<Typography variant="p" color="textSecondary">
												{article.content}
										</Typography>
									</CardContent>
                                </Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</React.Fragment>
	);
};

export default Articles;
