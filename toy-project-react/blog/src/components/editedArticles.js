import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


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

const EditedArticles = (props) => {
	const { editedArticles } = props;
    const classes = useStyles();
	
	if (editedArticles == null) {
		return <p>Sorry, only editors have access to this page.</p>
	} else if (editedArticles.length === 0) {
		return <p>There are no articles.</p>;
	}

	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{editedArticles.map((article) => {
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
											<b>{article.title.substr(0, 50)}</b> by <b>{article.written_by.name}</b> ({article.status})
										</Typography>
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

export default EditedArticles;
